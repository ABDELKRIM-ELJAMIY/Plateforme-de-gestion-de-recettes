import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '', 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:8000/users', formData);
            alert('Inscription réussie !');
            navigate('/login');
        } catch (err) {
            console.error(err);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 relative inline-block">
                        Créer un compte
                        <span className="block h-1 w-24 bg-yellow-400 mt-3"></span>
                    </h2>

                    <div className="mb-6">
                        <label htmlFor="username" className="block text-gray-700 text-lg font-medium mb-3">Nom d'utilisateur</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Entrez votre nom d'utilisateur"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-3">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Entrez votre email"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-3">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Créez un mot de passe"
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="role" className="block text-gray-700 text-lg font-medium mb-3">Rôle</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="">-- Choisissez un rôle --</option>
                            <option value="user">Utilisateur</option>
                            <option value="admin">Administrateur</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-xl py-4 px-8 rounded-lg transition-all shadow-lg hover:scale-105"
                    >
                        S'inscrire
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-lg">
                            Déjà un compte?{' '}
                            <Link to="/login" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;