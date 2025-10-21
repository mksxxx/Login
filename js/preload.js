const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
    login: (email, password) => ipcRenderer.invoke('login', email, password),
    abrirHome: () => ipcRenderer.send('abrir-home'),
    cadastrarUsuario: (dados) => ipcRenderer.invoke('cadastrar-usuario', dados),
    getUsuarioLogado: () => ipcRenderer.invoke('get-usuario-logado'),
    logout: () => ipcRenderer.send('logout'),
    lerHtml: (filePath) => ipcRenderer.invoke('ler-arquivo-html', filePath)
});