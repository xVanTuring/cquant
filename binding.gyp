{
    "targets": [
        {
            "target_name": "color-quant",
            "type": "static_library",
            "sources": [
                "./color-quant/src/colorquant.cpp",
                "./color-quant/src/pix.cpp",
                "./color-quant/src/vbox.cpp"
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
            "cflags_cc!": ["-fno-exceptions", ],
            "include_dirs":[
                "color-quant/src",
                "<!@(node -p \"require('node-addon-api').include\")"
            ],
            "xcode_settings": {
                'CLANG_CXX_LIBRARY': 'libc++',
                'CLANG_CXX_LANGUAGE_STANDARD': 'c++17',
                # https://github.com/mhdawson/node-sqlite3/blob/node-addon-api/binding.gyp
            },
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"]
        }
    ]
}
