/// <reference types="node" />
interface Color {
    R: number;
    G: number;
    B: number;
    count: number;
}
declare type Palette = Color[];
declare type CallBackFunc = (err: Error | undefined | string, result: Palette) => void;
declare type ImageDepth = 3 | 4;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
 * @param callback Callback function
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth | undefined, maxColor: number | undefined, maxSub: number | undefined, callback: CallBackFunc): void;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param callback Callback function
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number, callback: CallBackFunc): void;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param callback Callback function
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, callback: CallBackFunc): void;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param callback Callback function
 */
export declare function paletteAsync(buffer: Buffer, callback: CallBackFunc): void;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth | undefined, maxColor: number | undefined, maxSub: number | undefined): Promise<Palette>;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number, maxSub: number): Promise<Palette>;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 * @param maxColor Color Amount You want
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number): Promise<Palette>;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 * @param depth 3 or 4 for RGB/RGBA
 */
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth): Promise<Palette>;
/**
 *
 * @param buffer Image Buffer(RGB/RGBA)
 */
export declare function paletteAsync(buffer: Buffer): Promise<Palette>;
export {};
