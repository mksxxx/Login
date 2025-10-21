// js/user.js

// Função para limpar o formulário e "fechar" a view de Cadastro, 
// voltando para o conteúdo padrão da Home.
function limparConteudoCadastro() {
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        // Limpa o conteúdo injetado (o formulário)
        contentContainer.innerHTML = ''; 
        console.log('Conteúdo de Cadastro limpo.');

        // VVVV NOVO: MOSTRA A MENSAGEM DE BOAS-VINDAS NOVAMENTE VVVV
        const welcomeArea = document.getElementById('welcome-message-area');
        if (welcomeArea) {
            welcomeArea.style.display = 'block'; // Use 'block' ou 'flex' conforme o CSS
        }
        // ^^^^ FIM NOVO ^^^^
    }
}


// A função de cancelamento agora usa a função de limpeza acima.
function cancelarCadastro() {
    const confirmar = confirm("Tem certeza que deseja cancelar o cadastro? Todos os dados serão perdidos."); 
    if (confirmar) {
        limparConteudoCadastro(); // Chama a função de limpeza
    }
}


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
                // A chamada IPC para cadastrarUsuario é mantida, pois é a lógica do CRUD
                const res = await window.electronAPI.cadastrarUsuario(dados);

                if (res.success) {
                    alert('Usuário cadastrado com sucesso!');

                    // CORREÇÃO: Limpa a view e mostra a mensagem de boas-vindas
                    limparConteudoCadastro(); 
                    
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
                console.error('Erro de comunicação IPC ao cadastrar:', err);
                alert('Ocorreu um erro de comunicação. Tente novamente.');
            }
        });
    } else {
        // Aviso mantido para debug
        console.warn('Formulário de Cadastro com classe ".cadastro-form" não encontrado. Aguardando injeção do HTML.');
    }
});