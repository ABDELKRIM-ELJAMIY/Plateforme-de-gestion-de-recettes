
import React, { useEffect, useState } from 'react';
import Sidebar from '../layout/Sidebar';
import axios from 'axios';

const Dashboard = () => {
    const [recettes, setRecettes] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/recettes')
            .then(res => setRecettes(res.data))
            .catch(err => console.error('Erreur chargement recettes:', err));

        axios.get('http://localhost:8000/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error('Erreur chargement utilisateurs:', err));
    }, []);

    const totalRecettes = recettes.length;
    const totalUsers = users.length;
    const totalAdmins = users.filter(user => user.role === 'admin').length;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex-1 p-6 overflow-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Tableau de bord Admin</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2 text-yellow-500">Total Recettes</h2>
                        <p className="text-gray-700 text-lg">{totalRecettes} recettes publiées</p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-2 text-yellow-500">Utilisateurs</h2>
                        <p className="text-gray-700 text-lg">{totalAdmins} admins, {totalUsers} utilisateurs</p>
                    </div>

                    
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
