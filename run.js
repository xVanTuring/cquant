const cquant = require('./index')
const sharp = require('sharp')
const async = require('async')
// let queue = async.queue(({ buffer, index }, callback) => {
//   cquant.PaletteAsync(buffer, 8, (err, val) => {
//     console.log(index)
//     callback()
//   })
// }, 10)
sharp('./img/0.png')
  .raw()
  .toBuffer().then(buffer => {
    cquant.PaletteAsync(buffer, 5, (err, val) => {
      console.log(val)
      // callback()
    })
  }).catch(err => {
    console.log(err)
  })