const cquant = require('./index')
const sharp = require('sharp')
const arr = ['./img/0.jpg', './img/1.jpg', './img/2.png']
for (const iterator of arr) {
  sharp(iterator)
    .raw()
    .toBuffer((err, buffer, info) => {
      if (!err) {
        var start = Date.now()
        cquant.PaletteAsync(buffer, 5, info.channels, (err, val) => {
          console.log(Date.now() - start + ' ms');
          console.log(iterator+': ')
          console.log(val)
        })
      }
    })
}