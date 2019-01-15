const allVersion = ["6.14.2", "8.10.0", "9.11.0", "10.0.0", "11.0.0"]
const spawn = require('child_process').spawn
const async = require('async')
const which = require('which')
let buildQueue = async.queue((version, callback) => {
  let argv = ['-t', version, '--backend', 'cmake-js']
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
