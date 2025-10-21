
document.addEventListener('DOMContentLoaded', async () => {
    
    let user; 

    try {
        
        user = await window.electronAPI.getUsuarioLogado(); 

        
        if (user && user.nome) {
            const saudacaoElement = document.getElementById('msg');
            if (saudacaoElement) {
                saudacaoElement.textContent = `Olá, ${user.nome}`;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
    }

 
    const cadastroLink = document.getElementById('cadastroMenuLink');
    
  
    if (cadastroLink) {
        if (user && user.nivel === 1) {
            cadastroLink.style.display = 'block'; 
            
            cadastroLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.electronAPI.abrirCadastro();
            });
        } else {
            cadastroLink.style.display = 'none';
        }
    } else {
        console.warn('Link de Cadastro (cadastroMenuLink) não encontrado.');
    }


  
    const logoutButton = document.getElementById('logoutBtn');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            window.electronAPI.logout(); 
        });
    } else {
        console.error('Erro: Botão de logout (logoutBtn) não foi encontrado.');
    }
});