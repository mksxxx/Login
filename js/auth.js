const pool = require('./conexao');
const bcrypt = require('bcryptjs');

async function login(email, password) {
    try{
        const res = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        if (res.rows.length === 0) return false;

        const user = res.rows[0];
        if (bcrypt.compareSync(password, user.password)) return true;
        return false;
    } catch (err){
        throw err;
    }
}

module.exports = { login};