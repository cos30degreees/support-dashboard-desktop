(function() {

    const { BrowserWindow, app } = require('electron')

    const windowStateKeeper = require('electron-window-state')
    const path = require('path')
    const url = require('url')

    let mainWindow = null

    var createMainWindow = () => {
      let mainWindowState = windowStateKeeper({
        defaultWidth: 1000,
        defaultHeight: 750
      })

      let window = new BrowserWindow({
        'x': mainWindowState.x,
        'y': mainWindowState.y,
        'width': mainWindowState.width,
        'height': mainWindowState.height,
        'titleBarStyle': 'hidden'
      })

      window.loadURL(url.format({
        pathname: path.join(__dirname, '../../index.html'),
        protocol: 'file:',
        slashes: true
      }))

      window.on('close', function(event) {
        event.preventDefault()

        if (process.platform === 'darwin') {
          window.hide()
        } else {
          // there is a super weird bug where Electron opens a blank window, when a hidden window is restored.
          // I don't know why.. Happens on Windows and Linux.
          window.minimize()
        }
      })

      window.on('closed', function(event) {
        event.preventDefault()
      })

      window.setMenuBarVisibility(false)
      window.setAutoHideMenuBar(true)

      setWindow(window)
      mainWindowState.manage(window)

      return window
    }

    var setWindow = function(w) {
        mainWindow = w
    }

    var getWindow = function() {
        return mainWindow
    }

    module.exports.createMainWindow = createMainWindow;
    module.exports.getWindow = getWindow;
    module.exports.setWindow = setWindow;
}());
