//electron/main.js

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { selectQuery, closeConnection } = require('./dbManager.js');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    //fullscreen: true,
    width: 1920,
    height: 1080,
    //autoHideMenuBar: true, // Mantenha esta linha para esconder a barra de menus
    //frame: true, // Deixe frame como true para manter a barra de título
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') 
    }    
  });

  mainWindow.loadURL('http://localhost:3000'); // Carrega a aplicação React

  mainWindow.webContents.openDevTools();

  ipcMain.handle("getRecursosByCategoria", async (event, categoriaId) => {
    return new Promise((resolve) => {
      const query = `
        SELECT recursos.id, recursos.nome_recurso, recursos.caminho
        FROM recursos
        WHERE recursos.categoria_id = ? AND recursos.colecao_id = 2
      `;
  
      selectQuery(query, [categoriaId], (result) => {
        resolve(result);
      });
    });
  });
  


  mainWindow.on('closed', function () {
    mainWindow = null;
    closeConnection();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') { 
    app.quit(); 
    closeConnection();
  }
  
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
