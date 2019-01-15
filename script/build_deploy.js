// NODE: support lts version and latest version
// electron: 
const allVersion = [
  { r: "node", t: "6.14.2" },
  { r: "node", t: "8.10.0" },
  { r: "node", t: "10.0.0" },
  { r: "node", t: "11.0.0" },
  { r: "electron", t: "3.0.0" },
  { r: "electron", t: "4.0.0" },
]
const spawn = require('child_process').spawn
const async = require('async')
const which = require('which')
let buildQueue = async.queue(({ r, t }, callback) => {
  console.log(`Building: ${r} ${t}`)
  let argv = ['-r', r, '-t', t, '--backend', 'cmake-js']
  which('prebuild', (err, filePath) => {
    if (err) {
      callback(err)
    } else {
      let child = spawn(filePath, argv)
      child.stdout.pipe(process.stdout)
      child.stderr.pipe(process.stderr)
      child.on('exit', () => {
        callback()
      })
      child.on('error', (err) => {
        callback(err)
      })
    }
  })
}, 1)
allVersion.forEach((version) => {
  buildQueue.push(version)
})
