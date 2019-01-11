#include <napi.h>
#include <iostream>
#include "colorquant.h"
#include "async.h"
Napi::Value GetPalette(const Napi::CallbackInfo &info)
{
  Napi::Env env = info.Env();
  if (info.Length() < 1)
  {
    Napi::TypeError::New(env, "No Buffer").ThrowAsJavaScriptException();
    return env.Null();
  }
  if (!info[0].IsBuffer())
  {
    Napi::TypeError::New(env, "No Buffer").ThrowAsJavaScriptException();
    return env.Null();
  }
  Napi::Buffer<RGB_QUAD> buffer = info[0].As<Napi::Buffer<RGB_QUAD>>();
  PIX24 *pix24 = (PIX24 *)malloc(sizeof(PIX24));
  pix24->n = buffer.Length();
  pix24->pixs = buffer.Data();
  int max_count = 5;
  if (info.Length() > 1 && info[1].IsNumber())
  {
    auto count = info[1].As<Napi::Number>();
    if (count.Int32Value() > 1 && count.Int32Value() < 20)
    {
      max_count = count.Int32Value();
    }
  }
  int *counter = (int *)malloc(max_count * sizeof(int));
  PIXCMAP *cmap = pix_median_cut_quant24(pix24, max_count, 5, 1, counter);
  RGB_QUAD *quad = (RGB_QUAD *)cmap->array;
  Napi::Array result = Napi::Array::New(env);

  for (size_t i = 0; i < cmap->n; i++)
  {
    Napi::Object item = Napi::Object::New(env);
    item.Set("R", quad[i].red);
    item.Set("G", quad[i].green);
    item.Set("B", quad[i].blue);
    item.Set("count", counter[i]);
    result.Set(i, item);
  }

  free(pix24);
  free(cmap->array);
  free(cmap);
  free(counter);
  return result;
}
Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports.Set(Napi::String::New(env, "GetPalette"),
              Napi::Function::New(env, GetPalette));
  exports.Set(Napi::String::New(env, "PaletteAsync"),
              Napi::Function::New(env, PaletteAsync));
  return exports;
}
NODE_API_MODULE(cquant, Init)