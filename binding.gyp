{
    "targets": [
        {
            "target_name": "heap",
            "type": "static_library",
            "sources": [
                "./color-quant/heap/src/heap.c",
                "./color-quant/heap/src/utils.c",
            ]
        },
        {
            "target_name": "color-quant",
            "type": "static_library",
            "dependencies": [
                "heap"
            ],
            "sources":[
                "./color-quant/src/colorquant.c",
                "./color-quant/src/pix.c",
                "./color-quant/src/vbox.c"
            ],
            "include_dirs":[
                "color-quant/heap/src",
            ]
        },
        {
            "target_name": "cquant",
            "dependencies": [
                "color-quant",
            ],
            "sources":[
                "./src/addon.cc",
                "./src/async.cc"
            ],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "include_dirs":[
                "color-quant/heap/src",
                "color-quant/src",
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "defines":["NAPI_DISABLE_CPP_EXCEPTIONS"]
        }
    ]
}
