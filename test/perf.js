const os = require('os')
console.log('CPU Count: ' + os.cpus().length)
// 0.jpg 5572 x 3715
console.log('testing: 0.jpg 5572 x 3715')
// image-palette
var palette = require('image-palette')
var pixels = require('image-pixels');
// crashed 

// (async () => {
//   let start1 = Date.now();
//   let pixs = await pixels('./img/0.jpg')
//   var { ids, colors } = palette(pixs)
//   let time = Date.now() - start1
//   console.log(time)
// })();

// cquant
const sharp = require('sharp')
const cquant = require('../cquant')
sharp('./img/large.1.jpg')
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start2 = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, 0, (_err, res) => {
        if (!_err) {
          let time = Date.now() - start2;
          console.log(`cquant: large.1.jpg ${info.width} x ${info.height} Time: ${time} ms`)
        }
      })
    }
  });
(function () {
  let start1 = Date.now();
  pixels('./img/normal.jpg').then(pixs => {
    palette(pixs)
    let time = Date.now() - start1
    console.log(`image-palette: normal.jpg 1920 x 1280 Time: ${time}  ms`)
  }).catch(err => {
  })
})();
// cquant
sharp('./img/normal.jpg')
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start2 = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, 0, (_err, res) => {
        if (!_err) {
          let time = Date.now() - start2;
          console.log(`cquant: normal.jpg 1920 x 1280 Time: ${time} ms`)
        }
      })
    }
  });
sharp('./img/large.1.jpg')
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start2 = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, 1, (_err, res) => {
        if (!_err) {
          let time = Date.now() - start2;
          console.log(`cquant: large.1.jpg ${info.width} x ${info.height} No SubSample Time: ${time} ms`)
        }
      })
    }
  });
// cquant with no sub_smaple
// TODO: