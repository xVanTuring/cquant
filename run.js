const cquant = require('./index')
const sharp = require('sharp')
// const async = require('async')

sharp('./img/0.png')
  .raw()
  .toBuffer().then(buffer => {
    cquant.PaletteAsync(buffer, 5, 3, (err, val) => {
      console.log(val)
      // callback()
    })
  }).catch(err => {
    console.log(err)
  })