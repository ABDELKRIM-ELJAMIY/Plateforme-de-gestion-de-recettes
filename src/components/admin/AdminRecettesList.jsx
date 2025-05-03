// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link,useNavigate } from 'react-router-dom';

// const AdminRecettesList = () => {
//     const [recettes, setRecettes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchRecettes();
//     }, []);

//     const fetchRecettes = async () => {
//         try {
//             const res = await axios.get('http://localhost:8000/recettes');
//             setRecettes(res.data);
//         } catch (err) {
//             setError("Erreur lors du chargement des recettes.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm("Confirmer la suppression ?")) {
//             try {
//                 await axios.delete(`http://localhost:8000/recettes/${id}`);
//                 setRecettes(recettes.filter(recette => recette.id !== id));
//             } catch (err) {
//                 alert("Erreur lors de la suppression.");
//             }
//         }
//     };

//     const handleEdit = (id) => {
//         navigate(`/recettes/edit/${id}`);
//     };

//     if (loading) return <p className="text-center mt-10">Chargement...</p>;
//     if (error) return <p className="text-center text-red-500">{error}</p>;

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h1 className="text-3xl font-bold mb-6">Liste des Recettes</h1>
//             <ul className="space-y-4">
//                 {recettes.map(recette => (
//                     <li key={recette.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
//                         <div>
//                             <h2 className="text-xl font-semibold">{recette.title}</h2>
//                             <p className="text-gray-600">{recette.description?.slice(0, 100)}...</p>
//                         </div>
//                         <div className="flex gap-3">
//                             <Link
//                                 to={`/recettes/${recette.id}/edit`}                                className="text-blue-600 hover:underline"
//                             >
//                                 Modifier
//                             </Link>
//                             {/* <button
//                                 onClick={() => handleDelete(recette.id)}
//                                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                             >
//                                 Supprimer
//                             </button> */}

//                             <span
//                                 onClick={() => handleDelete(recette.id)}
//                                 className="text-red-600 hover:underline cursor-pointer"
//                             >
//                                 Supprimer
//                             </span>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminRecettesList;
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
            setError("Erreur lors du chargement des recettes.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/recettes/${id}`);
            setRecettes(recettes.filter(recette => recette.id !== id));
            toast.success("Recette supprimée avec succès");
        } catch (err) {
            toast.error("Erreur lors de la suppression");
        }
    };

    const handleEdit = (id) => {
        navigate(`/recettes/edit/${id}`);
    };

    if (loading) return <p className="text-center mt-10">Chargement...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Liste des Recettes</h1>
            <ul className="space-y-4">
                {recettes.map(recette => (
                    <li key={recette.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold">{recette.title}</h2>
                            <p className="text-gray-600">{recette.description?.slice(0, 100)}...</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                to={`/recettes/${recette.id}/edit`}
                                className="text-blue-600 hover:underline"
                            >
                                Modifier
                            </Link>
                            <span
                                onClick={() => handleDelete(recette.id)}
                                className="text-red-600 hover:underline cursor-pointer"
                            >
                                Supprimer
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminRecettesList;
