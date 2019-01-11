const addon = require('bindings')('cquant')
const sharp = require('sharp')
const async = require('async')
let queue = async.queue(({ buffer, index }, callback) => {
  addon.PaletteAsync(buffer, 8, (err, val) => {
    console.log(index)
    callback()
  })
}, 10)
sharp('./img/0.png')
  .raw()
  .toBuffer().then(buffer => {
    const time = Date.now()
    for (let index = 0; index < 50000; index++) {
      queue.push({ buffer, index })
    }
  }).catch(err => {
    console.log(err)
  })