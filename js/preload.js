const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electronAPI', {
    login: (email, password) => ipcRenderer.invoke('login', email, password),
    abrirHome: () => ipcRenderer.send('abrir-home')
});