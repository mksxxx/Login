console.log('Hello from Electron!');
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');
const { login } = require('./js/auth');
const { createUser } = require('./js/createUser')



let mainWindow

ipcMain.handle('login', async (event, email, password) => {
    return await login(email, password); 
});

ipcMain.handle('cadastrar-usuario', async (event, dados) => {
    const { nome, email, password, nivel } = dados;
    return await createUser(nome, password, email, nivel);
});


function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'js', 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null
    });
}


function abrirNovaJanela() {
    const homeWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'js', 'preload.js')
        }
    });

    homeWindow.loadFile('views/create.html');
}
/*
function abrirCadastro() {
    const cadastroWindow = new BrowserWindow({
        width: 600,
        height: 500,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'js', 'preload.js')
        }
    });

    cadastroWindow.loadFile('views/create.html');
}
*/
ipcMain.on('abrir-home', () => {
    abrirNovaJanela();
})


app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    app.quit()
})