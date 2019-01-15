const cquant = require('../cquant')
const os = require('os')
const sharp = require('sharp')
const async = require('async')
const myQueue = async.queue(async (filePath) => {
  // note : i am using async, so the callback is not needed
  const img = await sharp(filePath)
    .raw()// to raw
    .toBuffer({ resolveWithObject: true })
  const palette = await cquant.paletteAsync(img.data, img.info.channels, 5)
  console.log(palette)
}, os.cpus().length - 1) // don't be 2 crazy 
// myQueue.push("path/to/img")