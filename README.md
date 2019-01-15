# CQuant
[![Build status](https://ci.appveyor.com/api/projects/status/gy8vrvnkhrh9tw1s?svg=true)](https://ci.appveyor.com/project/xVanTuring/cquant)
## Usage
> `npm install cquant` (not ready)
``` js
const cquant = require('cquant')
// work best with sharp for converting image to RAW buffer
const sharp = require('sharp')
sharp('path/to/image')
  .raw() // convert raw buffer like RGB RGB RGB RGB
  .toBuffer((err, buffer, info) => {
    if (!err) {
      // you need to set the buffer and
      // the depth(only 3 for( RGB),4 (for RGBA) are accepted )
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
## Async!
This package is real async, and also very fast
## TODO
* add para for subsampling

---
xVan Turing 2019