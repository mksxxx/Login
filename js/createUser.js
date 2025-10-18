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
    } catch (err){
        console.error('Erro ao criar usuário: ', err.message) ;
    } finally{
        }    
}

const args = process.argv.slice(2);
if(args.length < 2) {
    console.log('Us: node criarUsuario.js <nome> <senha> [email] [nivel] ');
    process.exit(1);
}

const [nome, senha, email, nivel] = args;
createUser(nome, senha, email, nivel ? parseInt(nivel) : 1);