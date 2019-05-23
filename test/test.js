const cquant = require('../')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
const utils = require('./utils')
const enableFileOutput = true
const enableLogOutput = true
utils.logTag("Test.js")

function test(imagePath, subSample = 0) {
  return new Promise((resolve, reject) => {
    console.log("Start: " + imagePath)
    sharp(imagePath)
      .raw()
      .toBuffer((err, buffer, info) => {
        if (!err) {
          cquant.paletteAsync(buffer, info.channels, 5, subSample, (err, res) => {
            if (err) {
              reject(err)
              return
            }
            console.log(`Test: ${imagePath} - ${subSample === 0 ? "AutoSub" : "NoSub"} done!`)
            enableLogOutput && console.log(res)
            if (enableFileOutput) {

              let result_html = generateOutput(path.basename(imagePath), res)
              fs.writeFile(imagePath + ((subSample === 0) ? ".scaled" : ".full") + ".html", result_html, (err) => {
                if (err) {
                  console.error(err)
                } else {

                  console.log(`Output File saved: ${imagePath + ((subSample === 0) ? ".scaled" : ".full") + ".html"}`)
                }
                resolve()
              });
            } else {
              resolve(res)
            }
          })
        } else {
          reject()
        }
      })
  });

};
(async function () {
  await test('./img/large.1.jpg')
  await test('./img/large.1.jpg', 1)
  await test('./img/large.1.png')
  await test('./img/large.1.png', 1)

  await test('./img/large.2.jpg')
  await test('./img/large.2.jpg', 1)

  await test('./img/normal.jpg', 0)
  await test('./img/normal.jpg', 1)
})();


function generateBlock(r, g, b) {
  return `<div class="color" style="background-color:rgb(${r},${g},${b})">

  </div>`;
}
function generateImage(path) {
  return `<img src="${path}"/>`
}
function generateOutput(imagePath, result) {
  const stylePart = `
<style>
    .color {
        width: 100px;
        height: 100px;
        float: left;
    }
    img{
      width: 500px;
      display: block;
    }
</style>
`;
  let blocks = result.map((item) => {
    return generateBlock(item['R'], item['G'], item['B'])
  })
  let blkStr = blocks.join(' ');
  let imgStr = generateImage(imagePath)
  return stylePart + imgStr + blkStr;
}