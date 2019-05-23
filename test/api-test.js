const cquant = require('../')
const sharp = require('sharp')
const utils = require('./utils')
utils.logTag("Api.js")

function paraTest() {
    sharp('./img/large.1.jpg')
        .raw()
        .toBuffer((err, buffer, info) => {
            console.log('Start API Testing')
            cquant.paletteAsync(buffer, info.channels, 12, 1, (err, result) => {
                console.log(err === undefined ? 'Done: ' + result.length : 'Error')
            })
            cquant.paletteAsync(buffer, info.channels, 8, (err, result) => {
                console.log(err === undefined ? 'Done: ' + result.length : 'Error')
            })
            cquant.paletteAsync(buffer, info.channels, (err, result) => {
                console.log(err === undefined ? 'Done: ' + result.length : 'Error')
            })
            cquant.paletteAsync(buffer, (err, result) => {
                console.log(err === undefined ? 'Done: ' + result.length : 'Error')
            })
            cquant.paletteAsync(buffer).then(result => {
                console.log('Done: ' + result.length)
            }).catch(err => {
                console.log('Error')
            })
            cquant.paletteAsync(buffer, info.channels).then(result => {
                console.log('Done: ' + result.length)
            }).catch(err => {
                console.log('Error')
            })
            cquant.paletteAsync(buffer, info.channels, 10).then(result => {
                console.log('Done: ' + result.length)
            }).catch(err => {
                console.log('Error')
            })
            cquant.paletteAsync(buffer, info.channels, undefined, 1).then(result => {
                console.log('Done: ' + result.length)
            }).catch(err => {
                console.log('Error')
            })

        })
}
paraTest()