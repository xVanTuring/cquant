const fs = require('fs')
const allVersion = [
  { r: "napi", t: "3" },
  { r: "napi", t: "4" },
  { r: "electron", t: "3.0.0" },
  { r: "electron", t: "4.2.2" },
  { r: "electron", t: "5.0.1" },
]
const async = require('async')
if (process.env.BUILD_PREBUILDS) {
  
  if (!fs.existsSync('./.DEV')) {
    startBuild()
  } else {
    console.log(`Current Branch is DEV`);
    console.log("Skip BUILD Now!")
  }
}else{
  console.log("Current Environment does not have BUILD_PREBUILDS variable.")
  console.log("Skip BUILD Now!")
}


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