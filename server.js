const { ipcMain, shell, app } = require('electron')
const notifier = require('node-notifier')
const path = require('path')

// Create the menubar app
const mb = require('menubar')({ dir: 'app/', alwaysOnTop: true, preloadWindow: true, height: 250, icon: 'app/icon.png' })

// Create notifier instance
// const nc = new notifier.NotificationCenter()

mb.on('ready', () => mb.showWindow())
mb.on('ready', () => mb.window.toggleDevTools())

// Hide it when the user clicks away
// mb.on('focus-lost', () => mb.hideWindow())

// Focus on the window whenever it is shown
mb.on('after-show', () => mb.window.focus())

// Open external URL
ipcMain.on('open-in-browser', (e, arg) => arg !== null && shell.openExternal(arg))

// Quit application
ipcMain.on('quit', () => app.quit())

// Notifications
ipcMain.on('notification', (e, arg) => {
    console.log('notification request')
    if (!mb.window.isVisible()) notifier.notify(Object.assign(arg, {
        wait: true,
        appIcon: path.join(__dirname, 'app/icon.png'),
        contentImage: path.join(__dirname, 'app/icon.png'),
    }))
})
