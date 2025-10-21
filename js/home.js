document.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await window.electronAPI.getUsuarioLogado();

        if (user && user.nome) {
            const saudacaoElement = document.getElementById('msg');

            if (saudacaoElement) {
                saudacaoElement.textContent = `Olá, ${user.nome}`;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }

/*Logica logout*/

const logoutButton = document.getElementById('logoutBtn'); 

    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            window.electronAPI.logout(); 
        });
    } else {
        console.error('Erro: Botão de logout não foi encontrado.');
    }
});
