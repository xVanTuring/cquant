const addon = require('node-gyp-build')(__dirname);
interface Color {
  R: number;
  G: number;
  B: number;
  count: number;
}
type Palette = Color[];
type CallBackFunc = (err: Error | undefined | string, result: Palette) => void;
type ImageDepth = 3 | 4;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
 * @param callback Callback function
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth | undefined, maxColor: number | undefined, maxSub: number | undefined, callback: CallBackFunc): void;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param callback Callback function
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number, callback: CallBackFunc): void;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param callback Callback function
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth, callback: CallBackFunc): void;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param callback Callback function
 */
export function paletteAsync(buffer: Buffer, callback: CallBackFunc): void;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth | undefined, maxColor: number | undefined, maxSub: number | undefined): Promise<Palette>;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number, maxSub: number): Promise<Palette>;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number): Promise<Palette>;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 */
export function paletteAsync(buffer: Buffer, depth: ImageDepth): Promise<Palette>;
/**
 * 
 * @param buffer Image Buffer(RGB/RGBA)
 */
export function paletteAsync(buffer: Buffer): Promise<Palette>;
export function paletteAsync() {
  const [buffer, depth = 3, maxColor = 5, maxSub = 0, callback = null] = arguments
  if (arguments.length < 1 || buffer == null) {
    throw new Error("Too Few arguments")
  } else if (arguments.length === 2) {
    if (typeof (arguments[1]) === 'function') {
      return paletteAsync(buffer, undefined, undefined, undefined, arguments[1])
    }
  } else if (arguments.length === 3) {
    if (typeof (arguments[2]) === 'function') {
      return paletteAsync(buffer, arguments[1], undefined, undefined, arguments[2])
    }
  } else if (arguments.length === 4) {
    if (typeof (arguments[3]) === 'function') {
      return paletteAsync(buffer, arguments[1], arguments[2], undefined, arguments[3])
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
      addon.PaletteAsync(buffer, maxColor, depth, maxSub, (err: any, val: any) => {
        if (err) {
          rej(err)
        } else {
          res(val)
        }
      })
    })
  } else {
    if (depth !== 3 && depth !== 4) {
      callback(new Error('Wrong depth!'));
      return;
    }
    if (maxColor <= 1 || maxColor > 256) {
      callback(new Error('maxColor too small or too large!'))
      return
    }
    addon.PaletteAsync(buffer, maxColor, depth, maxSub, callback)
  }
}
