const btnCadastro = document.getElementById('btnCadastro');

btnCadastro.addEventListener('click', () => {
    window.electronAPI.abrirCadastro();
});