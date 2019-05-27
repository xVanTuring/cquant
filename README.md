# CQuant
[![Build status](https://ci.appveyor.com/api/projects/status/gy8vrvnkhrh9tw1s?svg=true)](https://ci.appveyor.com/project/xVanTuring/cquant)
[![Build Status](https://travis-ci.org/xVanTuring/cquant.svg?branch=master)](https://travis-ci.org/xVanTuring/cquant)
[![Npm](https://badge.fury.io/js/cquant.svg)](https://www.npmjs.com/package/cquant)
<img src="https://s2.ax1x.com/2019/04/15/AvpN8g.png" width="160" alt="cquant.png" title="cquant.png" align="right"/>

Cquant is node-addon-api based node extension, with the performance of C++, you can easily compute the major color of an image. The core algorithm of Cquant is based on [leptonica](http://www.leptonica.com).
## CQuant-Web is Here!
[CQuant-Web](https://github.com/xVanTuring/cquant-web)
## Usage
### View Latest Doc on [Github](https://github.com/xVanTuring/cquant)
* Supported Platform: Windows, Linux, macOS
* Node Supported Prebuild binary version: 6 | 8 | 10 | 11
* Electron Prebuild Supported Versions: v3 and v4.0.4
### Install
> `npm i cquant sharp` // install cquant and sharp
### Async!
This package is async. You can run multiple task without blocking the main loop.
### Basic
``` js
const cquant = require('cquant')
// use sharp to convert image to RGB Buffer Array
const sharp = require('sharp')
sharp('path/to/image')
  .raw() // convert raw buffer like [RGB RGB RGB RGB]
  .toBuffer((_err, buffer, info) => {
    if (!_err) {
      let colorCount = 4

      cquant.paletteAsync(buffer, info.channels, colorCount).then(res => {

        console.log(res)
      }).catch(err => {

        console.log(err)
      })
    }
  })
``` 
### API
``` ts  
  /**
   * 
   * @param buffer Image Buffer(RGB/RGBA)
   * @param depth 3 or 4 for RGB/RGBA
   * @param maxColor Color Amount You want
   * @param maxSub max sub-sample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
   * @param callback callback with err and result
   */
  function paletteAsync(buffer: Buffer, depth=3, maxColor=5, maxSub=0, callback:CallBackFunc): void;
  interface Color {
      R: number; /*red*/
      G: number; /*green*/
      B: number; /*blue*/
      count: number; /*count*/
  }
  declare type Palette = Color[];
  type CallBackFunc = (err, result: Palette) => void;
  function paletteAsync(buffer: Buffer, depth=3, maxColor=5, maxSub=0): Promise<Palette>;
  
```
## Perf
> test result will be diff based on your local machine
### JPG 5572 x 3715 (No SubSample)
| Program       | Time(ms) |
|---------------|:--------:|
| cquant        |   60 ms  |
| image-palette |    N/A   |
> N/A: crashed

### JPG 1920 x 1280 (No SubSample)

| Program       | Time(ms) |
|---------------|:--------:|
| cquant        |   12ms   |
| image-palette |   950ms  |
## Extra
### With `async.queue`
> If you have lots of image to process, the best way to do it is using [async](https://www.npmjs.com/package/async).queue for parallel, and controllable
``` js
// test/example.js
const myQueue = async.queue(async (filePath) => {
  const img = await sharp(filePath)
    .raw() // to raw
    .toBuffer({ resolveWithObject: true })
  const palette = await cquant.paletteAsync(img.data, img.info.channels, 5)
  console.log(palette)
}, os.cpus().length - 1)
```
## Preview
![Screenshot from 2019-02-09 15-16-32.png](https://i.loli.net/2019/02/09/5c5e7e7b42cd2.png)

## Electron User
After running the install command make sure to use electron-rebuild to rebuild it for electron, usually it will just download the prebuild.
## Build Your Self
### Build Tool
To be able to build from the source, you also need the standard build tool based on your OS.
#### For Windows User
* You can use this awesome app [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) to auto download all tools needed, if you don't have visual studio installed
* If you have already installed a visual studio like vs2017, basically you just need to enable c++ development(it's gonna be huge).
### Build it
Basically you need run this command 
``` bash
npm run build
```
---
xVan Turing 2019
