const form = document.querySelector('.login-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try{
        const success = await window.electronAPI.login(email, password);
        if(success){
            window.electronAPI.abrirHome();
        } else {
            //alert('Usuário ou senha incorretos!');
            //return
        }
    } catch (err){
        console.error(err);
        //alert('Erro ao tentar logar')
    }
})