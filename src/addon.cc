#include <napi.h>
#include <iostream>
#include "colorquant.h"
#include "async.h"
Napi::Object Init(Napi::Env env, Napi::Object exports) {
	exports.Set(Napi::String::New(env, "PaletteAsync"),
		Napi::Function::New(env, PaletteAsync));
	return exports;
}
NODE_API_MODULE(cquant, Init)