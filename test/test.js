const cquant = require('../')
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')
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
function generateBlock(r, g, b) {
  return `<div class="color" style="background-color:rgb(${r},${g},${b})">

  </div>`;
}
function generateImage(path) {
  return `<img src="${path}"/>`
}
function generateOutput(imagePath, result) {
  let blocks = result.map((item) => {
    return generateBlock(item['R'], item['G'], item['B'])
  })
  let blkStr = blocks.join(' ');
  let imgStr = generateImage(imagePath)
  return stylePart + imgStr + blkStr;
}
function test(imagePath, subSample = 0) { // './img/0.jpg'
  let id = parseInt(Math.random() * 10000);
  sharp(imagePath)
    .raw()
    .toBuffer((err, buffer, info) => {
      if (!err) {
        let start = Date.now()
        cquant.paletteAsync(buffer, info.channels, 5, subSample).then(res => {
          let time = Date.now() - start;
          // save to html
          console.log(`Test: ${imagePath} done! cost: ${time} ms`)
          console.log(res)
          let result_html = generateOutput(path.basename(imagePath), res)
          fs.writeFile(imagePath + ((subSample === 0) ? ".scaled" : ".full") + ".html", result_html, () => {
            console.log(`Output File saved: ${imagePath + ((subSample === 0) ? ".scaled" : ".full") + ".html"}`)
          });
        }).catch(err => {
          console.log(err)
        })
      }
    })
}
console.log('Start Image Testing')
test('./img/large.1.jpg')
test('./img/large.1.png')
test('./img/large.1.png', 1)
test('./img/large.2.jpg', 1)
test('./img/normal.jpg', 1)