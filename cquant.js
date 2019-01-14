const addon = require('bindings')('cquant')
function paletteAsync (buffer, depth = 3, maxColor = 5, callback = null) {
  if (callback == null) {
    if (depth !== 3 && depth !== 4) {
      return Promise.reject(new Error('Wrong Depth'));
    }
    if (maxColor <= 1 || maxColor > 256) {
      return Promise.reject(new Error('maxColor too small or too large'));
    }
    return new Promise((res, rej) => {
      addon.PaletteAsync(buffer, maxColor, depth, (err, val) => {
        if (err) {
          rej(err)
        } else {
          res(val)
        }
      })
    })
  } else {
    if (depth !== 3 && depth !== 4) {
      callback(new Error('Wrong Depth'));
      return;
    }
    if (maxColor <= 1 || maxColor > 256) {
      callback(new Error('maxColor too small or too large'))
      return
    }
    addon.PaletteAsync(buffer, maxColor, depth, callback)
  }
}
module.exports = {
  paletteAsync
}