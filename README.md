# CQuant
[![Build status](https://ci.appveyor.com/api/projects/status/gy8vrvnkhrh9tw1s?svg=true)](https://ci.appveyor.com/project/xVanTuring/cquant)
[![Build Status](https://travis-ci.org/xVanTuring/cquant.svg?branch=master)](https://travis-ci.org/xVanTuring/cquant)
## View Latest Doc on [Github](https://github.com/xVanTuring/cquant)
## Preview
![Screenshot from 2019-02-09 15-16-32.png](https://i.loli.net/2019/02/09/5c5e7e7b42cd2.png)

## Usage
> Current Supported Prebuild binary version: Node 6 | 8 | 10 | 11 \
> For Electron user:  Prebuild Supported Version v3 and v4.0.4
### Install
> `npm i cquant`
#### Electron User
After running the install command make sure to use electron-rebuild to rebuild it for electron, usually it will just download the prebuild.
### Async!
This package is real async. You can run multiple task without blocking the main loop
### API
``` ts
  interface Color {
      R: number;
      G: number;
      B: number;
      count: number;
  }
  declare type Palette = Color[];
  type CallBackFunc = (err: Error | undefined | string, result: Palette) => void;

  function paletteAsync(buffer: Buffer, depth=3, maxColor=5, maxSub=0): Promise<Palette>;
  /**
   * 
   * @param buffer Image Buffer(RGB/RGBA)
   * @param depth 3 or 4 for RGB/RGBA
   * @param maxColor Color Amout You want
   * @param maxSub max subsample for image, 1 for no sub sample,0 for auto, by default it will scale to size of `1000x1000`
   * @param callback callback with err and result
   */
  function paletteAsync(buffer: Buffer, depth=3, maxColor=5, maxSub=0, callback:CallBackFunc): void;

```
### Basic
``` js
const cquant = require('cquant')
// work best with sharp for converting image to RAW buffer
const sharp = require('sharp')
sharp('path/to/image')
  .raw() // convert raw buffer like RGB RGB RGB RGB
  .toBuffer((err, buffer, info) => {
    if (!err) {
      // you need to set the buffer and
      // the depth(only 3 (for RGB) and 4 (for RGBA) are accepted )
      // you can use callback, or leave it empty for promise
      let iWantForColor = 4
      cquant.paletteAsync(buffer, info.channels, iWantForColor).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  })
``` 
### With `async.queue`
> If you have lots of image to process, the best way to do it is using [async](https://www.npmjs.com/package/async).queue for parallel, and controllable
``` js
// test/example.js
const myQueue = async.queue(async (filePath) => {
  // note : i am using the `async` function, so the callback is not needed
  const img = await sharp(filePath)
    .raw() // to raw
    .toBuffer({ resolveWithObject: true })
  const palette = await cquant.paletteAsync(img.data, img.info.channels, 5)
  console.log(palette)
}, os.cpus().length - 1)
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
## Build Your Self
### CMake
You need to install [CMake](https://cmake.org/download/) based on your System.
### Build Tool
To be able to build from the source, you also need the standard build tool based on your OS.
#### For Windows User
* You can use this awesome app [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) to auto download all tools needed, if you don't have visual studio installed
* If you have already installed a visual studio like vs2017, basicly you just need to enable c++ developement(it's gonna be huge).
### Build it
> for more info you can view project [cmake-js](https://github.com/cmake-js/cmake-js#installation)
Basically you need run this command 
``` bash
cmake-js -r electron -v 4.0.4 rebuild # for electron
cmake-js -r node -v 10.0.0 rebuild # for node
```
---
xVan Turing 2019