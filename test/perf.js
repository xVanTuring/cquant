const os = require('os')
console.log('CPU Count: ' + os.cpus().length)
// image-palette
var palette = require('image-palette')
var pixels = require('image-pixels');

const sharp = require('sharp')
const cquant = require('../cquant')
console.log("====Perf.js====")
console.log("===============");

function Test1() {
  return new Promise((resolve, reject) => {
    sharp('./img/large.1.jpg')
      .raw()
      .toBuffer((err, buffer, info) => {
        if (!err) {
          let start2 = Date.now()
          cquant.paletteAsync(buffer, info.channels, 5, 0, (_err, res) => {
            if (!_err) {
              let time = Date.now() - start2;
              console.log(`cquant: large.1.jpg ${info.width} x ${info.height} Time: ${time} ms`)
              resolve()
            }
          })
        }
      });
  })
};

function Test2() {
  return new Promise((resolve, reject) => {
    sharp('./img/normal.jpg')
      .raw()
      .toBuffer((err, buffer, info) => {
        if (!err) {
          let start2 = Date.now()
          cquant.paletteAsync(buffer, info.channels, 5, 0, (_err, res) => {
            if (!_err) {
              let time = Date.now() - start2;
              console.log(`cquant: normal.jpg 1920 x 1280 Time: ${time} ms`)
              resolve()
            }
          })
        }
      });
  })
};
function Test3() {
  return new Promise((resolve, reject) => {
    sharp('./img/large.2.jpg')
      .raw()
      .toBuffer((err, buffer, info) => {
        if (!err) {
          let start2 = Date.now()
          cquant.paletteAsync(buffer, info.channels, 5, 1, (_err, res) => {
            if (!_err) {
              let time = Date.now() - start2;
              console.log(`cquant: large.1.jpg ${info.width} x ${info.height} No SubSample Time: ${time} ms`)
              resolve()
            }
          })
        }
      });
  })
};
function Test4() {
  try {
    (function () {
      let start1 = Date.now();
      pixels('./img/normal.jpg').then(pixs => {
        palette(pixs)
        let time = Date.now() - start1
        console.log(`image-palette: normal.jpg 1920 x 1280 Time: ${time}  ms`)
      }).catch(err => {
      })
    })();
  } catch (error) {
    console.log(error)
  }
}
(async function () {
  await Test1();
  await Test2();
  await Test3();
  Test4();
})()
