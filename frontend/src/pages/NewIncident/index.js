import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

const initialState = { title: '', description: '', value: '' }

function NewIncident() {
    const [fields, setFields] = useState(initialState);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongToken = localStorage.getItem('ongToken');

    async function handleRegister(e) {
        e.preventDefault();

        try {
            await api.post('incidents', fields, {
                headers: {
                    Authorization: `Bearer ${ongToken}`,
                    ongId: ongId,
                }
            });

            setFields(initialState);

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    function handleChange(e) {
        setFields({ ...fields, [e.currentTarget.name]: e.currentTarget.value });
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Título do caso" name="title" value={fields.title} onChange={handleChange} />
                    <textarea placeholder="Descrição" name="description" value={fields.description} onChange={handleChange} />
                    <input placeholder="Valor em reais" name="value" value={fields.value} onChange={handleChange} />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
export default NewIncident;