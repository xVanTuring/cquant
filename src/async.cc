#include <napi.h>
#include "async.h"
#include "colorquant.h"
class PaletteWorker : public Napi::AsyncWorker {
public:
	PaletteWorker(Napi::Function &callback, PIX *pix, int max_color)
		: Napi::AsyncWorker(callback),
		pix(pix), max_color(max_color),
		counter(NULL), cmap(NULL) {
	}
	~PaletteWorker() {
		if (counter) {
			free(counter);
		}
		if (cmap) {
			if (cmap->array) {
				free(cmap->array);
			}
			free(cmap);
		}
		if (pix) {
			free(pix);
		}
	}
	void Execute() {
		counter = (size_t *)malloc(sizeof(size_t) * max_color);
		cmap = pix_median_cut_quant(pix, max_color, 5, 0, counter);
	}
	void OnOK() {
		Napi::HandleScope scope(Env());

		if (cmap == NULL) {
			auto err = Napi::Error::New(Env(), "Buffer corrupted or image too small or too less color");
			Callback().Call({ err.Value(), Env().Undefined() });
			return;
		}

		Napi::Array result = Napi::Array::New(Env());
		RGB_QUAD *quad = (RGB_QUAD *)cmap->array;
		for (size_t i = 0; i < cmap->n; i++) {
			Napi::Object item = Napi::Object::New(Env());
			item.Set("R", quad[i].red);
			item.Set("G", quad[i].green);
			item.Set("B", quad[i].blue);
			item.Set("count", counter[i]);
			result.Set(i, item);
		}
		Callback().Call({ Env().Undefined(), result });
	}

private:
	PIX *pix;
	int max_color;
	PIXCMAP *cmap;
	size_t *counter;
};
Napi::Value PaletteAsync(const Napi::CallbackInfo &info) {
	auto depth = info[2].As<Napi::Number>().Int32Value();
	auto max_color = info[1].As<Napi::Number>().Int32Value();

	Napi::Function callback;
	callback = info[3].As<Napi::Function>();

	PIX *pix = (PIX *)malloc(sizeof(PIX));
	if (depth == 3) {
		auto buffer = info[0].As<Napi::Buffer<RGB_QUAD>>();
		pix->n = buffer.Length();
		pix->pixs = buffer.Data();
	}
	else if (depth == 4) {
		auto buffer = info[0].As<Napi::Buffer<RGBA_QUAD>>();
		pix->n = buffer.Length();
		pix->pixs = buffer.Data();
	}
	pix->depth = depth;
	PaletteWorker *paletteWorker = new PaletteWorker(callback, pix, max_color);
	paletteWorker->Queue();
	return info.Env().Undefined();
}
