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
                "<!(node -p \"require('node-addon-api').gyp\")"
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
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS", ],
            "conditions":[
                ['OS=="mac"', {
                    'cflags+': ['-fvisibility=hidden'],
                    'xcode_settings': {
                        'GCC_SYMBOLS_PRIVATE_EXTERN': 'YES',  # -fvisibility=hidden
                        'CLANG_CXX_LIBRARY': 'libc++',
                        'CLANG_CXX_LANGUAGE_STANDARD': 'c++17',
                    }
                }]
            ]
        }
    ]
}
