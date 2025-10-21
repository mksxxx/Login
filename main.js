console.log('Hello from Electron!');
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs'); // <<< NOVO: Para leitura de arquivos
const { login } = require('./js/auth');
const { createUser } = require('./js/createUser')



let mainWindow
let homeWindow = null
let usuarioLogado = null


ipcMain.handle('login', async (event, email, password) => {
    // ... (inalterado)
    const user = await login(email, password)
    if (user) {
        usuarioLogado = user
        return true
    }
    return false;
});

ipcMain.handle('get-usuario-logado', () => {
    // ... (inalterado)
    return usuarioLogado
})

ipcMain.handle('cadastrar-usuario', async (event, dados) => {
    // ... (inalterado)
    const { nome, email, password, nivel } = dados;
    return await createUser(nome, password, email, nivel);
});

ipcMain.on('logout', () => {
    // ... (inalterado)
    usuarioLogado = null;
    if (homeWindow) {
        homeWindow.close();
        homeWindow = null;
    }
    if (!mainWindow) {
        createWindow();
    }
});

// Manipulador de clique no ícone de cadastro (inalterado, envia a mensagem)
ipcMain.on('abrir-cadastro', (event) => {
    if (usuarioLogado && usuarioLogado.nivel === 1) {
       if (homeWindow) {
            homeWindow.webContents.send('carregar-view', 'views/create.html');
        }
    } else {
        console.warn('Tentativa de acesso não autorizada à tela de Cadastro.');
    }
});

// VVVV NOVO: MANIPULADOR IPC PARA LER ARQUIVOS (A solução para o "Failed to fetch") VVVV
ipcMain.handle('ler-arquivo-html', (event, filePath) => {
    try {
        // Constrói o caminho absoluto a partir da pasta raiz do seu main.js
        const absolutePath = path.join(__dirname, filePath);
        
        // Lê o conteúdo do arquivo de forma síncrona
        const htmlContent = fs.readFileSync(absolutePath, 'utf8');
        
        return { success: true, html: htmlContent };
        
    } catch (error) {
        console.error(`Erro ao ler arquivo ${filePath}:`, error.message);
        return { success: false, error: error.message };
    }
});
// ^^^^ FIM NOVO ^^^^


function createWindow() {
// ... (inalterado)
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

    mainWindow.maximize();

    mainWindow.on('closed', () => {
        mainWindow = null
    });
}


function abrirNovaJanela() {
// ... (inalterado)
    homeWindow = new BrowserWindow({
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


ipcMain.on('abrir-home', () => {
// ... (inalterado)
    abrirNovaJanela();

    if (mainWindow) {
        mainWindow.close()
    }
})


app.whenReady().then(() => {
// ... (inalterado)
    createWindow();
})

app.on('window-all-closed', () => {
// ... (inalterado)
    app.quit()
})