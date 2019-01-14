const cquant = require('./index')
const sharp = require('sharp')
const arr = ['./img/0.jpg', './img/1.jpg', './img/2.png']
// will work
sharp('./img/0.jpg')
  .raw()
  .toBuffer((err, buffer, info) => {
    if (!err) {
      var start = Date.now()
      cquant.PaletteAsync(buffer, 8, info.channels, (_err, val) => {
        console.log(Date.now() - start + ' ms');
        console.log(val)
      })
    }
  })
// will throw error
cquant.PaletteAsync(Buffer.from([0, 0, 0, 150]), 8, 4, (err, val) => {
  if (err) {
    console.log(err.message)
  } else {
    console.log(val)
  }
})