const pool = require('./conexao');
const bcrypt = require('bcryptjs');

async function createUser(nome, password, email, nivel) {

    try{
        const senhaHash = bcrypt.hashSync(password, 10)

        await pool.query(
            'INSERT INTO usuarios (nome, password, email, nivel) VALUES ($1, $2, $3, $4)',
            [nome, senhaHash, email, nivel]
        );

        console.log(`Usuario "${email}" criado com sucesso!`);
        return { success: true}
    } catch (err){
        console.error('Erro ao criar usuário: ', err.message) ;
         return { success: false, error: err.message };
    } 
}


module.exports = { createUser };