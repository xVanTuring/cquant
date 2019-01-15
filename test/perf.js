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
sharp('./img/0.jpg')
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start2 = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, (_err, res) => {
        if (!_err) {
          let time = Date.now() - start2;
          console.log('cquant: 0.jpg 5572 x 3715 Time: ' + time + ' ms')
        }
      })
    }
  });
// 3.jpg 1920 x 1280
// image-palette
// (async () => {
//   let start1 = Date.now();
//   let pixs = await pixels('./img/3.jpg')
//   var { ids, colors } = palette(pixs)
//   let time = Date.now() - start1
//   console.log('image-palette: 3.jpg 1920 x 1280 Time: ' + time + ' ms')
// })();
(function () {
  let start1 = Date.now();
  pixels('./img/3.jpg').then(pixs => {
    palette(pixs)
    let time = Date.now() - start1
    console.log('image-palette: 3.jpg 1920 x 1280 Time: ' + time + ' ms')
  }).catch(err => {
  })
})();
// cquant
sharp('./img/3.jpg')
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start2 = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, (_err, res) => {
        if (!_err) {
          let time = Date.now() - start2;
          console.log('cquant: 3.jpg 1920 x 1280 Time: ' + time + ' ms')
        }
      })
    }
  });

// cquant with no sub_smaple
// TODO: