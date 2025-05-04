


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIsLoggedIn(true);
            if (user.role === 'admin') {
                setIsAdmin(true);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate('/');
    };

    return (
        <header className="bg-white shadow-md">
            <div className="bg-yellow-400 h-2"></div>

            <nav className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-4">
                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-400 p-0.5 shadow-lg">
                        <img
                            src={Logo}
                            alt="logo"
                            className="rounded-full w-full h-full object-cover"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-extrabold text-gray-800">
                            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-transparent bg-clip-text">
                                Anwal
                            </span>
                        </h1>
                        <p className="text-sm text-gray-500 italic mt-1">
                            “Adirz Rbi tamR3at n lazz — اللهم اكسر عصى الجوع”
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
                    <ul className="flex flex-wrap space-x-1 md:space-x-4 lg:space-x-8 text-gray-700 font-medium">
                        <li>
                            <Link to="/" className="block px-4 py-2 hover:text-yellow-500 hover:bg-gray-50 rounded-md transition-colors duration-300">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="block px-4 py-2 hover:text-yellow-500 hover:bg-gray-50 rounded-md transition-colors duration-300">
                                À propos
                            </Link>
                        </li>
                    </ul>

                    <div className="flex space-x-4">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded-md hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                                >
                                    Inscription
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors duration-300"
                                >
                                    Connexion
                                </Link>
                            </>
                        ) : (
                            <>
                                {isAdmin && (
                                    <Link
                                        to="/admin-dashboard"
                                        className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-300"
                                    >
                                        Dashboard Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                                >
                                    Déconnexion
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default NavBar;
