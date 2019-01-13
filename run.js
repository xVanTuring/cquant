const cquant = require('./index')
const sharp = require('sharp')
// const async = require('async')

sharp('./img/0.png')
  .raw()
  .toBuffer().then(buffer => {
    var start = Date.now()
    cquant.PaletteAsync(buffer, 5, 3, (err, val) => {
      console.log(Date.now() - start);
      console.log(val)
    })
  }).catch(err => {
    console.log(err)
  })