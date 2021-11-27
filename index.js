const {app, BrowserWindow} = require('electron');
const path = require('path');
const debug = require('electron-debug');

debug({showDevTools: false});

// Note: Must match `build.appId` in package.json.
app.setAppUserModelId('com.company.AppName');

// Electron Reloader
try {
  require('electron-reloader')(module);
} catch { }

let mainWindow;
// Create Window.
const createMainWindow = async () => {
  const win = new BrowserWindow({
    title: app.name,
    show: false,
    minWidth: 600,
    minHeight: 400,
    backgroundColor: '#000',
    icon: __dirname + './build/icon.png',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // Protect against prototype pollution.
      enableRemoteModule: false, // Turn off Remote
      preload: path.join(app.getAppPath(), './app/preload.js'),
    },
  });
  win.webContents.userAgent = "DiscordBot (https://example.com, v0.0.1)"
  win.on('ready-to-show', () => {
    win.maximize();
    win.show();
  });
  win.on('closed', () => {
    // Dereference the window.
    // For multiple windows store them in an array.
    mainWindow = undefined;
  });

  // Optional:

  win.removeMenu(); // Remove menu.

  await win.loadFile(path.join(__dirname, './index.html'));
  return win;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
  app.quit();
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', async () => {
  if (!mainWindow) {
    mainWindow = await createMainWindow();
  }
});

(async () => {
  await app.whenReady();
  mainWindow = await createMainWindow();
})();
