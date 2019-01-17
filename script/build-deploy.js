// NODE: support lts version and latest version
// electron: 
const allVersion = [
  { r: "node", t: "6.14.4" },
  { r: "node", t: "8.10.0" },
  { r: "node", t: "10.0.0" },
  { r: "node", t: "11.0.0" },
  { r: "electron", t: "3.0.0" },
  { r: "electron", t: "4.0.1" },
]
const spawn = require('child_process').spawn
const async = require('async')
const which = require('which')
if (!process.env.PREBUILD_TOKEN) {
  console.log('No Provided Uploaded token')
  process.exit(0);
}
let buildQueue = async.queue(({ r, t }, callback) => {
  console.log(`Building: ${r} ${t}`)
  let argv = ['-r', r, '-t', t, '-u', process.env.PREBUILD_TOKEN, '--backend', 'cmake-js']
  which('prebuild', (err, prebuildPath) => {
    if (err) {
      callback(err)
    } else {
      let child = spawn(prebuildPath, argv)
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
