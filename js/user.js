document.addEventListener('DOMContentLoaded', () => {

    const cadastro = document.querySelector('.cadastro-form');

    if (cadastro) {
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


                    window.electronAPI.fecharCadastro();
                } else {

                    let errorMessage = 'Erro ao cadastrar usuário.';
                    if (res.error && res.error.includes('duplicate key value')) {
                        errorMessage = 'Erro: Este email já está cadastrado.';
                    } else if (res.error) {
                        errorMessage += ': ' + res.error.substring(0, 80);
                    }
                    alert(errorMessage);
                }
            } catch (err) {
                console.error('Erro de comunicação IPC:', err);
                alert('Ocorreu um erro de comunicação. Tente novamente.');
            }
        });
    } else {
        console.error('Formulário de Cadastro com classe ".cadastro-form" não encontrado.');
    }
});

function cancelarCadastro() {
    const confirmar = confirm("Tem certeza que deseja cancelar o cadastro?"); 
    if (confirmar) {
        window.electronAPI.fecharCadastro();
    }
}