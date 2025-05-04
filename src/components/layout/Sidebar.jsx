import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="w-64 bg-gray-800 text-white p-6 space-y-6 hidden md:block">
            <h2 className="text-2xl font-bold mb-4">Admin</h2>
            <nav className="space-y-4">
                <Link to="/admin-dashboard" className="block hover:text-yellow-400">Dashboard</Link>
                <Link to="/AdminRecettesList" className="block hover:text-yellow-400">Gérer les recettes</Link>
                <Link to="/RecipeForm" className="block hover:text-yellow-400">Ajouter une recette</Link>
                <Link to="/" className="block hover:text-yellow-400">Retour à l'accueil</Link>
            </nav>
        </div>
    );
};

export default Sidebar;



