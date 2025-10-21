console.log('Hello from Electron!');
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');
const { login } = require('./js/auth');
const { createUser } = require('./js/createUser')



let mainWindow
let homeWindow = null
let usuarioLogado = null

ipcMain.handle('login', async (event, email, password) => {

    const user = await login(email, password)
    if (user) {
        usuarioLogado = user
        return true
    }
    return false;
});

ipcMain.handle('get-usuario-logado', () => {
    return usuarioLogado
})

ipcMain.handle('cadastrar-usuario', async (event, dados) => {
    const { nome, email, password, nivel } = dados;
    return await createUser(nome, password, email, nivel);
});

ipcMain.on('logout', () => {
        usuarioLogado = null;
        if (homeWindow) {
            homeWindow.close();
            homeWindow = null; // Garante que a referência é limpa
        }
        if (!mainWindow) {
            createWindow();
        }
    });


function createWindow() {
    mainWindow = new BrowserWindow({
        /*fullscreen: true,*/
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'js', 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.maximize();

    mainWindow.on('closed', () => {
        mainWindow = null
    });
}


function abrirNovaJanela() {
    homeWindow = new BrowserWindow({
        /*fullscreen: true,*/
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'js', 'preload.js')
        }
    });

    homeWindow.loadFile('views/home.html');
    homeWindow.maximize();

    homeWindow.on('closed', () => {
        homeWindow = null;
    });

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

    if (mainWindow) {
        mainWindow.close()
    }
})


app.whenReady().then(() => {
    createWindow();
})

app.on('window-all-closed', () => {
    app.quit()
})