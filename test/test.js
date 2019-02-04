const cquant = require('../cquant')
const fs = require('fs')
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

sharp('./img/1.jpg')
  .raw()
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5).then(res => {
        let time = Date.now() - start;
        // save to html
        console.log('test2: ' + time + ' ms')
        console.log(res)
        let result_html = generateOutput('1.jpg', res)
        fs.writeFile('./img/1.jpg.html', result_html, () => {
          console.log("Output File saved: ./img/1.jpg.html")
        });
      }).catch(err => {
        console.log(err)
      })
    }
  })
sharp('./img/3.jpg')
  .raw()
  .toBuffer((err, buffer, info) => {
    if (!err) {
      let start = Date.now()
      cquant.paletteAsync(buffer, info.channels, 5, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          let time = Date.now() - start;
          console.log('test4: ' + time + ' ms')
          let result_html = generateOutput('3.jpg', res)
          fs.writeFile('./img/3.jpg.html', result_html, () => {
            console.log("Output File saved: ./img/3.jpg.html")
          });
          res.forEach(item => {
            console.log(`rgb(${item['R']},${item['G']},${item['B']})`)
          })
        }
      })
    }
  })
