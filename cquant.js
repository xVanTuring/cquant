"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addon = require('node-gyp-build')(__dirname);
function paletteAsync() {
    const [buffer, depth = 3, maxColor = 5, maxSub = 0, callback = null] = arguments;
    if (arguments.length < 1 || buffer == null) {
        throw new Error("Too Few arguments");
    }
    else if (arguments.length === 2) {
        if (typeof (arguments[1]) === 'function') {
            return paletteAsync(buffer, undefined, undefined, undefined, arguments[1]);
        }
    }
    else if (arguments.length === 3) {
        if (typeof (arguments[2]) === 'function') {
            return paletteAsync(buffer, arguments[1], undefined, undefined, arguments[2]);
        }
    }
    else if (arguments.length === 4) {
        if (typeof (arguments[3]) === 'function') {
            return paletteAsync(buffer, arguments[1], arguments[2], undefined, arguments[3]);
        }
    }
    if (callback == null) {
        if (depth !== 3 && depth !== 4) {
            return Promise.reject(new Error('Wrong depth!'));
        }
        if (maxColor <= 1 || maxColor > 256) {
            return Promise.reject(new Error('maxColor too small or too large!'));
        }
        return new Promise((res, rej) => {
            addon.PaletteAsync(buffer, maxColor, depth, maxSub, (err, val) => {
                if (err) {
                    rej(err);
                }
                else {
                    res(val);
                }
            });
        });
    }
    else {
        if (depth !== 3 && depth !== 4) {
            callback(new Error('Wrong depth!'));
            return;
        }
        if (maxColor <= 1 || maxColor > 256) {
            callback(new Error('maxColor too small or too large!'));
            return;
        }
        addon.PaletteAsync(buffer, maxColor, depth, maxSub, callback);
    }
}
exports.paletteAsync = paletteAsync;
//# sourceMappingURL=cquant.js.map