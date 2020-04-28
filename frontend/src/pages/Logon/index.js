import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const initialState = { id: '', password: '' }

function Logon() {
    const [fields, setFields] = useState(initialState);

    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', fields);

            localStorage.setItem('ongId', fields.id);
            localStorage.setItem('ongName', response.data.name);
            localStorage.setItem('ongToken', response.data.token);

            history.push('/profile');

        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    function handleChange(e) {
        setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be To Hero" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="ID"
                        name="id"
                        value={fields.id}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        value={fields.password}
                        onChange={handleChange}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
export default Logon;