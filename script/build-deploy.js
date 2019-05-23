const async = require('async')
const spawn = require('child_process').spawn
const which = require("which")
const allVersion = [
  { r: "napi", t: "3" },
  { r: "napi", t: "4" },
  { r: "electron", t: "3.0.0" },
  { r: "electron", t: "4.2.2" },
  { r: "electron", t: "5.0.1" },
]
if (process.env.BUILD_PREBUILDS) {

  if (process.env.TRAVIS_BRANCH === "master" || process.env.APPVEYOR_REPO_BRANCH === "master") {
    startBuild(true)
  } else {
    startBuild(false)
    console.log(`Current Branch is ${process.env.TRAVIS_BRANCH || process.env.APPVEYOR_REPO_BRANCH}`);
    console.log("Build Without Uploading")
  }
} else {
  console.log("Current Environment does not have BUILD_PREBUILDS variable.")
  console.log("Skip BUILD Now!")
}


function startBuild(upload = false) {
  if (upload && !process.env.PREBUILD_TOKEN) {
    console.log('No Provided Uploaded token')
    process.exit(0);
  }
  let buildQueue = async.queue(({ r, t }, callback) => {
    console.log(`Building: ${r} ${t}`)
    let argv = upload ? ['-r', r, '-t', t, '-u', process.env.PREBUILD_TOKEN,] : ['-r', r, '-t', t,]
    let execPath = which.sync('prebuild', { path: "./node_modules/.bin", nothrow: true })
    let child = spawn(execPath, argv)
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