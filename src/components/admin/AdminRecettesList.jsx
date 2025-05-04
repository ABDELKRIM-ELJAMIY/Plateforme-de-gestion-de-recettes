import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminRecettesList = () => {
    const [recettes, setRecettes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecettes();
    }, []);

    const fetchRecettes = async () => {
        try {
            const res = await axios.get('http://localhost:8000/recettes');
            setRecettes(res.data);
        } catch (err) {
            console.error(err);
            setError("Erreur lors du chargement des recettes.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/recettes/${id}`);
            setRecettes(prev => prev.filter(recette => recette.id !== id));
            toast.success("Recette supprimée avec succès");
        } catch (err) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const handleBack = () => {
        navigate(-1); 
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Chargement des recettes...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Liste des Recettes</h1>
                <button
                    onClick={handleBack}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                    ← Retour
                </button>
            </div>

            {recettes.length === 0 ? (
                <p className="text-gray-600 text-center">Aucune recette trouvée.</p>
            ) : (
                <ul className="space-y-4">
                    {recettes.map(recette => (
                        <li key={recette.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-semibold">{recette.title}</h2>
                                <p className="text-gray-600">{recette.description?.slice(0, 100)}...</p>
                            </div>
                            <div className="flex gap-4">
                                <Link
                                    to={`/recettes/${recette.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Modifier
                                </Link>
                                <button
                                    onClick={() => handleDelete(recette.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AdminRecettesList;
