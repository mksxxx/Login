
const esconderMensagemBoasVindas = () => {
    const area = document.getElementById('welcome-message-area');
    if (area) {
        area.style.display = 'none';
    }
};


const mostrarMensagemBoasVindas = () => {
    const area = document.getElementById('welcome-message-area');
    if (area) {
        
        area.style.display = 'block'; 
    }
};




const carregarConteudo = async (filePath) => {
    esconderMensagemBoasVindas(); 
    

    const contentContainer = document.getElementById('content-container');
    
    if (!contentContainer) {
        console.error('Erro: Elemento #content-container não encontrado.');
        return;
    }

 
    try {
        const resultado = await window.electronAPI.lerHtml(filePath); 

        if (resultado.success) {
         
            contentContainer.innerHTML = resultado.html;
            
           
            const scriptUrl = '../js/user.js';
            
     
            const oldScript = document.querySelector(`script[src="${scriptUrl}"]`);
            if (oldScript) oldScript.remove(); 

        
            const newScript = document.createElement('script');
            newScript.src = scriptUrl;
            newScript.onload = () => {
                console.log(`Script ${scriptUrl} carregado e pronto!`);
            };
            document.body.appendChild(newScript);

        } else {
        
            contentContainer.innerHTML = `<p style="color: red;">Erro ao carregar o conteúdo: ${resultado.error}</p>`;
            console.error('Erro de leitura IPC:', resultado.error);
            mostrarMensagemBoasVindas(); 
        }
        
    } catch (err) {
    
        contentContainer.innerHTML = `<p style="color: red;">Erro de comunicação ao carregar: ${err.message}</p>`;
        console.error('Erro de comunicação IPC:', err);
        mostrarMensagemBoasVindas(); 
    }
};




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

 
    const cadastroMenuLink = document.getElementById('cadastroMenuLink');
    
    if (cadastroMenuLink) {
        if (user && user.nivel === 1) { 
            cadastroMenuLink.style.display = 'block'; 
            
            cadastroMenuLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                carregarConteudo('views/create.html'); 
            });
        } else {
            cadastroMenuLink.style.display = 'none';
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