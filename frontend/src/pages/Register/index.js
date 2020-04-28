import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

const initalState = { name: '', email: '', password: '', whatsapp: '', city: '', uf: '' }

function Register() {
    const history = useHistory();

    const [fields, setFields] = useState(initalState);

    async function handleRegister(e) {
        e.preventDefault();

        try {
            const response = await api.post('ongs', fields);

            setFields(initalState);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    function handleChange(e) {
        setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" name="name" value={fields.name} onChange={handleChange} />
                    <input type="email" placeholder="Email" name="email" value={fields.email} onChange={handleChange} />
                    <input type="password" placeholder="Senha" name="password" value={fields.password} onChange={handleChange} />
                    <input placeholder="WhatsApp" name="whatsapp" value={fields.whatsapp} onChange={handleChange} />

                    <div className="input-group">
                        <input placeholder="Cidade" name="city" value={fields.city} onChange={handleChange} />
                        <input placeholder="UF" name="uf" value={fields.uf} onChange={handleChange} style={{ width: 80 }} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
export default Register;