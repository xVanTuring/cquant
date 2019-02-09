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
export declare function paletteAsync(buffer: Buffer, callback: CallBackFunc): void;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, callback: CallBackFunc): void;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number, callback: CallBackFunc): void;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth | undefined, maxColor: number | undefined, maxSub: number | undefined, callback: CallBackFunc): void;
export declare function paletteAsync(buffer: Buffer): Promise<Palette>;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth): Promise<Palette>;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number): Promise<Palette>;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth, maxColor: number, maxSub: number): Promise<Palette>;
export declare function paletteAsync(buffer: Buffer, depth: ImageDepth | undefined, maxColor: number | undefined, maxSub: number | undefined): Promise<Palette>;
export {};
