const allVersion = [
  { r: "napi", t: "3" },
  { r: "napi", t: "4" },
  { r: "electron", t: "3.0.0" },
  { r: "electron", t: "4.2.2" },
  { r: "electron", t: "5.0.1" },
]
const exec = require('child_process').exec
const command = "git rev-parse --abbrev-ref HEAD"
const spawn = require('child_process').spawn
const async = require('async')
exec(command, (err, stdout) => {
  if (!err) {
    let branch = stdout.replace("\n", "")
    if (branch === "master") {
      startBuild()
    } else {
      console.log(`Current Branch is ${branch}`);
    }
  }
})


function startBuild() {
  if (!process.env.PREBUILD_TOKEN) {
    console.log('No Provided Uploaded token')
    process.exit(0);
  }
  let buildQueue = async.queue(({ r, t }, callback) => {
    console.log(`Building: ${r} ${t}`)
    let argv = ['-r', r, '-t', t, '-u', process.env.PREBUILD_TOKEN,]
    let child = spawn("./node_modules/.bin/prebuild", argv)
    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on('exit', () => {
      callback()
    })
    child.on('error', (err) => {
      callback(err)
    })
  }, 1)
  allVersion.forEach((version) => {
    buildQueue.push(version, (err, ) => {
      if (err) {
        console.log(err)
      }
    })
  })

}