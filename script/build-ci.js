var spawn = require('cross-spawn')
var npmRunPath = require('npm-run-path-compat')
var log = require('npmlog')
var versionChanged = require('version-changed')
var version = require('../package.json').version
var getTarget = require('node-abi').getTarget

if (!process.env.CI) process.exit()

log.heading = 'prebuild-ci'
log.level = 'verbose'

var token = process.env.PREBUILD_TOKEN
if (!token) {
  log.error('PREBUILD_TOKEN required')
  process.exit(0)
}

function prebuild (runtime, target, cb) {
  log.info('build', runtime, 'abi', target)
  var ps = spawn('prebuild', [
    '-r', runtime,
    '-t', target,
    '-u', token,
    '--backend', 'cmake-js',
    '--verbose'
  ], {
      env: npmRunPath.env()
    })
  ps.stdout.pipe(process.stdout)
  ps.stderr.pipe(process.stderr)
  ps.on('exit', function (code) {
    if (code) return cb(Error(), code)
    cb()
  })
}

log.info('begin', 'Prebuild-CI version', version)

prebuild('node', process.versions.node, function (err, code) {
  if (err) process.exit(code)
  log.info('All done!')
  process.exit(code)
  // prebuild('electron', '4.0.1', function (err, code) {
  //   if (err) process.exit(code)
  //   log.info('All done!')
  //   process.exit(code)
  // })
})