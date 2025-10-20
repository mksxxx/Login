const cadastro = document.querySelector('.cadastro-form');

cadastro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        nivel: parseInt(document.getElementById('nivel').value)
    };

    try {
        const res = await window.electronAPI.cadastrarUsuario(dados);

        if (res.success) {
            alert('Usuário cadastrado com sucesso!');
            cadastro.reset();
            window.electronAPI.abrirHome();
        } else {
            alert('Erro ao cadastrar usuário: ' + res.error);
        }
    } catch (err) {
        console.error(err);
        alert('Erro ao cadastrar usuário');
    }
});
