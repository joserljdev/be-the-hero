const crypto = require('crypto');
const connection = require('../database/connection');
const bcrypt = require('bcrypt');

module.exports = {
    async index(request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    async create(request, response) {
        const { name, email, password, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);

        await connection('ongs').insert({
            id,
            name,
            email,
            password: passwordHash,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
}