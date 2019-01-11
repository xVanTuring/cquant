const addon = require('bindings')('cquant')
const sharp = require('sharp')
// console.log(addon)
sharp('./img/0.png')
  .raw()
  .toBuffer().then(buffer => {
    //  console.log(buffer[0])
    var time = Date.now()
    let data = addon.GetPalette(buffer, 8)
    console.log(Date.now() - time, 'ms')
    console.log(data)
  }).catch(err => {
    console.log(err)
  })