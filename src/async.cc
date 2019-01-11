#include <napi.h>
#include "async.h"
#include "colorquant.h"
class PaletteWorker : public Napi::AsyncWorker
{
public:
  PaletteWorker(Napi::Function &callback, PIX24 *pix, int max_color)
      : Napi::AsyncWorker(callback),
        pix(pix), max_color(max_color),
        counter(NULL), cmap(NULL) {}
  ~PaletteWorker()
  {
    if (counter)
    {
      free(counter);
    }
    if (cmap)
    {
      free(cmap->array);
      free(cmap);
    }
    if(pix){
      free(pix);
    }
  }
  void Execute()
  {
    counter = (int *)malloc(sizeof(int) * max_color);
    cmap = pix_median_cut_quant24(pix, max_color, 5, 1, counter);
  }
  void OnOK()
  {
    Napi::HandleScope scope(Env());
    Napi::Array result = Napi::Array::New(Env());
    RGB_QUAD *quad = (RGB_QUAD *)cmap->array;
    for (size_t i = 0; i < cmap->n; i++)
    {
      Napi::Object item = Napi::Object::New(Env());
      item.Set("R", quad[i].red);
      item.Set("G", quad[i].green);
      item.Set("B", quad[i].blue);
      item.Set("count", counter[i]);
      result.Set(i, item);
    }
    Callback().Call({Env().Undefined(), result});
  }

private:
  PIX24 *pix;
  int max_color;
  PIXCMAP *cmap;
  int *counter;
};
Napi::Value PaletteAsync(const Napi::CallbackInfo &info)
{
  auto buffer = info[0].As<Napi::Buffer<RGB_QUAD>>();

  auto max_color = info[1].As<Napi::Number>().Uint32Value();

  Napi::Function callback = info[2].As<Napi::Function>();

  PIX24 *pix24 = (PIX24 *)malloc(sizeof(PIX24));
  pix24->n = buffer.Length();
  pix24->pixs = buffer.Data();

  PaletteWorker *paletteWorker = new PaletteWorker(callback, pix24, max_color);
  paletteWorker->Queue();
  return info.Env().Undefined();
}
