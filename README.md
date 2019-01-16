# CQuant
[![Build status](https://ci.appveyor.com/api/projects/status/gy8vrvnkhrh9tw1s?svg=true)](https://ci.appveyor.com/project/xVanTuring/cquant)
[![Build Status](https://travis-ci.org/xVanTuring/cquant.svg?branch=master)](https://travis-ci.org/xVanTuring/cquant)
## Usage
> Current Supported Prebuild binary version: Node 6 | 8 | 10 | 11 \
> For Electron user: Fixing, Coming soon ~~only binary supported version is v4. More Info On: [Build For Electron](#electron-build)~~

> `npm i cquant`
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
      // the depth(only 3 (for RGB),4 (for RGBA) are accepted )
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
> If you have lots of image to process, the best way to do it is using [async](https://www.npmjs.com/package/async).queue for parallel, and control-able
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
### JPG 5572 x 3715
| Program       | Time(ms) |
|---------------|:--------:|
| cquant        | 14-15 ms |
| image-palette |    N/A   |
> N/A: crashed

### JPG 1920 x 1280

| Program       | Time(ms) |
|---------------|:--------:|
| cquant        |    3ms   |
| image-palette |   950ms  |
## Build Your Self
### CMake
You need to install [CMake](https://cmake.org/download/) based on your System.
### Build Tool
To be able to build from the source, you also need the standard build tool based on your OS.
#### For Windows User
* You can use this awesome app [windows-build-tools](https://www.npmjs.com/package/windows-build-tools) to auto download all tools needed, if you don't have visual studio installed
* If you have already installed a visual studio like vs2017, basicly you just need to enable c++ developement(it's gonna be huge).
### [Electron](#electron-build)
> due to something between v3 and v4, although they have the same abi but it seams
not gonna work for one prebuild binary, so I only created a v4 version,you can still compile it by you self
1. Get All tool need, like cmake and build tool based on you OS;
2. before you install the package, and following code to you package.json
``` json
  "cmake-js": {
    "runtime": "electron", // it can also be node/nw
    "runtimeVersion": "3.0.0", // the version that you want like v3.0.0
    "arch": "x64" // arch
  }
```
3. then install the package by 
``` bash
npm i cquant // yarn should be fine
```
> For non-electron v3 user, usually you are fine to continue coding now. 
4. For electron v3 user, you may try to use in your code, if it causes error, let'go on.\
(Why? Because the electron v3 and v4 have the same abi number, but due to some build tool changes in electron team, the prebuild binary wasn't compatible.)
5. You need to go to the node_modules/cquant, run command line, it will rebuild the code with the info your set in your root package.json. This should work
``` bash
npm run rebuild
```

## Async!
This package is real async, and also very fast
## TODO
* add para for subsampling

---
xVan Turing 2019