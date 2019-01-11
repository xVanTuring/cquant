const addon = require('bindings')('cquant')
const sharp = require('sharp')

sharp('./img/0.png')
  .raw()
  .toBuffer().then(buffer => {
    // var time = Date.now()
    let data = addon.GetPalette(buffer, 8)
    addon.PaletteAsync(buffer, 8, (err, val) => {
      // console.log(index)
    })
    // console.log(Date.now() - time + 'ms')
    // console.log(data)
  }).catch(err => {
    console.log(err)
  })
const http = require('http')
http.createServer(() => {

}).listen(300);