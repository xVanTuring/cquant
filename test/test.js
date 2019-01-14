const cquant = require('../cquant')
const sharp = require('sharp')
// const arr = ['./img/0.jpg', './img/1.jpg', './img/2.png']
sharp('./img/0.jpg')
  // .resize(1920)
  .raw()
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start = Date.now()
      cquant.paletteAsync(buffer, info.channels, 30).then(res => {
        let time = Date.now() - start;
        console.log('test1: ' + time + ' ms')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  })
sharp('./img/1.jpg')
  // .resize(1920)
  .raw()
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5).then(res => {
        let time = Date.now() - start;
        console.log('test2: ' + time + ' ms')
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  })
sharp('./img/2.png')
  // .resize(1920)
  .raw()
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, (err, val) => {
        if (err) {
          console.log(err)
        } else {
          let time = Date.now() - start;
          console.log('test3: ' + time + ' ms')
          console.log(val)
        }
      })
    }
  })