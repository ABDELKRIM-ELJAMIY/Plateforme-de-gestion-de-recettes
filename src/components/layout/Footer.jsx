import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 mt-10">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
                <p className="text-sm">&copy; 2025 Plateforme de gestion des recettes. Tous droits réservés.</p>
                <div className="flex gap-4 text-sm">
                    <Link to="/" className="hover:underline">Accueil</Link>
                    <Link to="/about" className="hover:underline">À propos</Link>
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
