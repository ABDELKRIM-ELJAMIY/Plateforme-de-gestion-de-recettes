import React from 'react';
import { GiCook } from 'react-icons/gi';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">À propos de la plateforme</h1>
                    <p className="text-lg text-gray-600">
                        Découvrez une plateforme dédiée à la passion de la cuisine, où recettes, découvertes et partages culinaires prennent vie.
                    </p>
                </div>
                <div className="lg:flex lg:space-x-12">
                    <div className="lg:w-1/2 mb-8 lg:mb-0">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Une expérience culinaire enrichissante</h2>
                        <p className="text-gray-700 mb-6">
                            La plateforme permet à tous les passionnés de cuisine de découvrir une large variété de recettes, d’ajouter leurs créations personnelles et de les partager avec une communauté grandissante. Que vous soyez novice ou expert, chaque recette est une invitation à explorer de nouveaux horizons gustatifs.
                        </p>
                        <div className="flex items-center space-x-4">
                            <GiCook className="text-4xl text-green-500" />
                            <p className="text-lg text-gray-600">
                                Explorez des recettes diversifiées, allant des plats traditionnels aux créations modernes, pour toutes les occasions.
                            </p>
                        </div>
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Partagez vos créations et inspirez les autres</h2>
                        <p className="text-gray-700 mb-6">
                            La plateforme est un espace où chaque utilisateur peut contribuer en partageant ses recettes. Chaque ajout est modéré pour garantir la qualité et l’authenticité des contenus. Que vous souhaitiez partager un plat traditionnel ou une recette originale, vous pouvez recevoir des retours et de l’inspiration de la part de la communauté.
                        </p>
                        <div className="flex items-center space-x-4">
                            <GiCook className="text-4xl text-green-500" />
                            <p className="text-lg text-gray-600">
                                Un espace de partage convivial où chaque recette raconte une histoire.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Fonctionnalités principales</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <li className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Ajoutez vos recettes</h3>
                            <p className="text-gray-600">
                                Partagez vos propres créations culinaires avec la communauté. Des plats salés, sucrés, végétariens, sans gluten… à vous de jouer !
                            </p>
                        </li>
                        <li className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Explorez une variété de recettes</h3>
                            <p className="text-gray-600">
                                Parcourez une bibliothèque de recettes créées par des passionnés, allant des recettes du quotidien aux plats gastronomiques.
                            </p>
                        </li>
                        <li className="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Partagez vos astuces et conseils</h3>
                            <p className="text-gray-600">
                                En plus des recettes, partagez vos astuces, conseils et expériences de cuisine pour aider et inspirer d’autres utilisateurs.
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
