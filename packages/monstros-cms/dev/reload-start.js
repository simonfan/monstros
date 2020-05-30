const path = require('path')
const fs = require('fs')
const child_process = require('child_process')

const chokidar = require('chokidar')

const KEYSTONE_ENTRY_FILE_PATH = path.join(__dirname, '../dist/index.js')

let KEYSTONE_PROCESS = null

const restartKeystone = () => {

  if (KEYSTONE_PROCESS !== null) {
    KEYSTONE_PROCESS.kill()
  }

  setTimeout(() => {
    fs.readFileSync(KEYSTONE_ENTRY_FILE_PATH)
    // spawn electron
    KEYSTONE_PROCESS = child_process.spawn('npm', ['run', 'keystone-dev'], {
      env: {
        // https://maximilianschmitt.me/posts/error-spawn-node-enoent-node-js-child-process/
        ...process.env,
        NODE_ENV: 'development',
        KEYSTONE_COOKIE_SECRET: 'development-cookie-secret',
      }
    })

    KEYSTONE_PROCESS.stdout.pipe(process.stdout)
    KEYSTONE_PROCESS.stderr.pipe(process.stderr)
  }, 100)

  return KEYSTONE_PROCESS
}

setTimeout(() => {
  const watcher = chokidar.watch(KEYSTONE_ENTRY_FILE_PATH)

  watcher.on('add', restartKeystone)
  watcher.on('change', restartKeystone)
  watcher.on('unlink', restartKeystone)
}, 1000)
