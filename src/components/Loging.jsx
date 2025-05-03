// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// const Login = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.get(`http://localhost:8000/users?email=${formData.email}&password=${formData.password}`);

//             if (res.data.length === 1) {
//                 const user = res.data[0];

//                 const { password, ...userWithoutPassword } = user;
//                 localStorage.setItem("user", JSON.stringify(userWithoutPassword));

//                 if (user.role === "admin") {
//                     navigate("/admin-dashboard");
//                 } else {
//                     navigate("/user-home");
//                 }
//             } else {
//                 setError("Identifiants incorrects");
//             }
//         } catch (err) {
//             console.error(err);
//             setError("Erreur lors de la connexion");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex flex-col">
//             <div className="flex-grow flex items-center justify-center px-4 py-12">
//                 <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
//                     <h2 className="text-3xl font-bold mb-8 text-gray-800 relative inline-block">
//                         Connexion
//                         <span className="block h-1 w-24 bg-yellow-400 mt-3"></span>
//                     </h2>

//                     {error && (
//                         <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg text-lg">
//                             {error}
//                         </div>
//                     )}

//                     <div className="mb-6">
//                         <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-3">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             placeholder="Entrez votre email"
//                         />
//                     </div>

//                     <div className="mb-8">
//                         <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-3">Mot de passe</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                             placeholder="Entrez votre mot de passe"
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-xl py-4 px-8 rounded-lg transition-all shadow-lg hover:scale-105"
//                     >
//                         Se connecter
//                     </button>

//                     <div className="mt-8 text-center">
//                         <p className="text-gray-600 text-lg">
//                             Pas encore de compte ?{' '}
//                             <Link to="/register" className="text-yellow-500 hover:text-yellow-600 font-semibold">
//                                 S'inscrire
//                             </Link>
//                         </p>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast'; // ✅ import du toast

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8000/users?email=${formData.email}&password=${formData.password}`);

            if (res.data.length === 1) {
                const user = res.data[0];
                const { password, ...userWithoutPassword } = user;
                localStorage.setItem("user", JSON.stringify(userWithoutPassword));

                toast.success("Connexion réussie ✅");

                if (user.role === "admin") {
                    navigate("/admin-dashboard");
                } else {
                    navigate("/user-home");
                }
            } else {
                toast.error("Identifiants incorrects ❌");
            }
        } catch (err) {
            console.error(err);
            toast.error("Erreur lors de la connexion ❌");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 relative inline-block">
                        Connexion
                        <span className="block h-1 w-24 bg-yellow-400 mt-3"></span>
                    </h2>

                    {/* ✅ Suppression du bloc d'erreur en dur */}

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

                    <div className="mb-8">
                        <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-3">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold text-xl py-4 px-8 rounded-lg transition-all shadow-lg hover:scale-105"
                    >
                        Se connecter
                    </button>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600 text-lg">
                            Pas encore de compte ?{' '}
                            <Link to="/register" className="text-yellow-500 hover:text-yellow-600 font-semibold">
                                S'inscrire
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
