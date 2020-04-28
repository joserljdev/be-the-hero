const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const env = require('../.env');

module.exports = {
    async create(request, response) {
        const { id, password } = request.body;

        const ong = await connection('ongs')
            .where('id', id)
            .select('name', 'email', 'password')
            .first();

        if (ong && bcrypt.compareSync(password, ong.password)) {
            const{ name, email } = ong;
   
            const token = jwt.sign({ name, email }, env.authSecret, {
                expiresIn: 86400,
            });

            return response.json({ name, email, token });

        } else {
            return response.status(400).json({ error: 'Usuário/Senha inválidos.' });
        }
    }
}