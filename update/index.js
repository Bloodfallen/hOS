const { app, BrowserWindow } = require('electron');
let win;

function CreateWindow() {
    win = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: true
        }
    });

    win.loadFile('updater.html');
    win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });
    app.on('ready', createWindow);

    app.on('window-all-closed', () => {
        // nahhh
    });

    app.on('activate', () => {
        if(win === null) {
            createWindow();
        }
    });
}