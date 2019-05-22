#include "async.h"
#include "colorquant.h"
#include <iostream>
#include <napi.h>
class PaletteWorker : public Napi::AsyncWorker {
private:
  std::shared_ptr<PIX> pix;
  int max_color;
  std::shared_ptr<PIXCMAP> cmap;
  int max_sub;

public:
  PaletteWorker(Napi::Function &callback, std::shared_ptr<PIX> _pix,
                int max_color, int max_sub)
      : Napi::AsyncWorker(callback), pix(_pix), max_color(max_color),
        max_sub(max_sub) {}
  ~PaletteWorker() {}
  void Execute() { cmap = pix_median_cut_quant(pix, max_color, 5, max_sub); }
  void OnOK() {
    Napi::HandleScope scope(Env());

    if (cmap == nullptr) {
      auto err = Napi::Error::New(
          Env(), "Buffer corrupted or image too small or too less color");
      Callback().Call({err.Value(), Env().Undefined()});
      return;
    }

    Napi::Array result = Napi::Array::New(Env());

    for (size_t i = 0; i < cmap->array->size(); i++) {
      Napi::Object item = Napi::Object::New(Env());
      auto _item = cmap->array->at(i);
      item.Set("R", _item->red);
      item.Set("G", _item->green);
      item.Set("B", _item->blue);
      item.Set("count", _item->count);
      result.Set(i, item);
    }

    Callback().Call({Env().Undefined(), result});
  }
};
Napi::Value PaletteAsync(const Napi::CallbackInfo &info) {
  auto depth = info[2].As<Napi::Number>().Int32Value();
  auto max_color = info[1].As<Napi::Number>().Int32Value();
  auto max_sub = info[3].As<Napi::Number>().Int32Value();

  Napi::Function callback;
  callback = info[4].As<Napi::Function>();

  std::shared_ptr<PIX> pix = std::make_shared<PIX>();
  if (depth == 3) {
    auto buffer = info[0].As<Napi::Buffer<RGB_Quad>>();
    pix->n = buffer.Length();
    pix->pixs = buffer.Data();
  } else if (depth == 4) {
    auto buffer = info[0].As<Napi::Buffer<RGBA_Quad>>();
    pix->n = buffer.Length();
    pix->pixs = buffer.Data();
  }
  pix->depth = depth;
  PaletteWorker *paletteWorker =
      new PaletteWorker(callback, pix, max_color, max_sub);
  paletteWorker->Queue();
  return info.Env().Undefined();
}
