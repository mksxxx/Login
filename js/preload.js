const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
    login: (email, password) => ipcRenderer.invoke('login', email, password),
    abrirHome: () => ipcRenderer.send('abrir-home'),
    abrirCadastro: () => ipcRenderer.send('abrir-cadastro'),
    fecharCadastro: () => ipcRenderer.send('fechar-cadastro'),
    cadastrarUsuario: (dados) => ipcRenderer.invoke('cadastrar-usuario', dados),
    getUsuarioLogado: () => ipcRenderer.invoke('get-usuario-logado'),
    logout: () => ipcRenderer.send('logout')
});