const pool = require('./conexao');
const bcrypt = require('bcryptjs');

async function login(email, password) {
    try {
        const res = await pool.query(
            'SELECT * FROM usuarios WHERE email = $1',
            [email]
        );
        if (res.rows.length === 0) return false;

        const user = res.rows[0];
        if (bcrypt.compareSync(password, user.password)) {
            const { password, ...usuarioInfo } = user;
            return usuarioInfo;
        } return null;
    } catch (err) {
        console.error("Erro no login:", err)
        throw err;
    }
}

module.exports = { login };