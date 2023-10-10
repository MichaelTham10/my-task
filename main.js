const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // Untuk mengizinkan penggunaan Node.js di renderer process
    },
  });

  const url = isDev
    ? 'http://localhost:3000' // Jalankan dari server Next.js saat dalam mode development
    : `file://${__dirname}/../out/index.html`; // Gunakan file HTML saat dalam mode production

  mainWindow.loadURL(url);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
