import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Format d'email invalide")
                .required("L'email est requis"),
            password: Yup.string()
                .min(6, "Le mot de passe doit contenir au moins 6 caractères")
                .required("Le mot de passe est requis")
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.get(`http://localhost:8000/users?email=${values.email}&password=${values.password}`);

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
                    toast.error("Identifiants incorrects ");
                }
            } catch (err) {
                console.error(err);
                toast.error("Erreur lors de la connexion ");
            }
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <div className="flex-grow flex items-center justify-center px-4 py-12">
                <form onSubmit={formik.handleSubmit} className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-2xl">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 relative inline-block">
                        Connexion
                        <span className="block h-1 w-24 bg-yellow-400 mt-3"></span>
                    </h2>

                    <div className="mb-6">
                        <label htmlFor="email" className="block text-gray-700 text-lg font-medium mb-3">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Entrez votre email"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="text-red-500 mt-2">{formik.errors.email}</div>
                        )}
                    </div>

                    <div className="mb-8">
                        <label htmlFor="password" className="block text-gray-700 text-lg font-medium mb-3">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Entrez votre mot de passe"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="text-red-500 mt-2">{formik.errors.password}</div>
                        )}
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
