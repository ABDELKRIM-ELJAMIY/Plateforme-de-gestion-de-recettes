
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // ✅ toast importé

const EditRecipeForm = () => {
    const { id } = useParams();
    const [ingredientsList, setIngredients] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/recettes')
            .then((res) => {
                console.log("Param ID:", id);
                console.log("Fetched recipes:", res.data);
                const recette = res.data.find((r) => String(r.id) === String(id));
                if (recette) {
                    formik.setValues({
                        title: recette.title,
                        description: recette.description,
                        ingredients: recette.ingredients || [],
                        instructions: recette.instructions,
                        imageBase64: recette.image,
                        image: null
                    });
                    setImagePreview(recette.image);
                } else {
                    toast.error('Recette non trouvée.'); // ✅ remplacé alert
                }
            })
            .catch((err) => {
                console.error('Error fetching recipes:', err);
                toast.error('Erreur lors de la récupération des recettes.'); // ✅ remplacé alert
            });

        axios.get('http://localhost:8000/ingredients')
            .then((res) => {
                const ingredients = res.data.length > 0 ? Object.values(res.data[0]) : [];
                setIngredients(ingredients);
            })
            .catch((err) => {
                console.error('Error fetching ingredients:', err);
                toast.error('Erreur lors de la récupération des ingrédients.'); // ✅ remplacé alert
            });
    }, [id]);

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            ingredients: [],
            instructions: '',
            image: null,
            imageBase64: ''
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Le titre doit avoir au moins 3 caractères')
                .required('Le titre est obligatoire'),
            description: Yup.string().required('La description est obligatoire'),
            ingredients: Yup.array().min(1, 'Veuillez sélectionner au moins un ingrédient'),
            instructions: Yup.string().required('Les instructions sont obligatoires'),
            imageBase64: Yup.string().required('L\'image est obligatoire')
        }),
        onSubmit: (values) => {
            const updatedRecipe = {
                title: values.title,
                description: values.description,
                ingredients: values.ingredients,
                instructions: values.instructions,
                image: values.imageBase64
            };

            axios.put(`http://localhost:8000/recettes/${id}`, updatedRecipe)
                .then((res) => {
                    toast.success('Recette mise à jour avec succès !'); // ✅ remplacé alert
                    navigate('/AdminRecettesList');
                })
                .catch((err) => {
                    console.error('Erreur lors de la mise à jour de la recette:', err);
                    toast.error('Erreur lors de la mise à jour.'); // ✅ ajout
                });
        }
    });

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                formik.setFieldValue('imageBase64', base64);
                formik.setFieldValue('image', file);
                setImagePreview(base64);
            } catch (error) {
                console.error('Error converting image to base64:', error);
                toast.error('Erreur lors du traitement de l\'image.'); // ✅ ajout
            }
        }
    };

    const addIngredient = (ingredient) => {
        if (!formik.values.ingredients.includes(ingredient)) {
            formik.setFieldValue('ingredients', [...formik.values.ingredients, ingredient]);
        }
        setDropdownOpen(false);
    };

    const removeIngredient = (ingredient) => {
        formik.setFieldValue('ingredients', formik.values.ingredients.filter((item) => item !== ingredient));
    };

    return (
            <div className="w-full min-h-screen p-6 bg-white rounded-lg shadow-lg">
                <div className="bg-yellow-300 py-4 px-6 rounded-t-lg -mx-6 -mt-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Modifier la Recette</h2>
                </div>

                <div className="space-y-6">
                    <div className="space-y-1">
                        <label htmlFor="title" className="block text-gray-800 font-medium">Titre de la recette</label>
                        <input
                            type="text"
                            id="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            className={`w-full p-3 border rounded-md bg-gray-50 ${formik.errors.title && formik.touched.title ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.errors.title && formik.touched.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="description" className="block text-gray-800 font-medium">Description</label>
                        <textarea
                            id="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            rows="3"
                            className={`w-full p-3 border rounded-md bg-gray-50 ${formik.errors.description && formik.touched.description ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.errors.description && formik.touched.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="ingredients" className="block text-gray-800 font-medium">Ingrédients</label>
                        <div className="relative">
                            <div
                                className={`flex flex-wrap gap-2 min-h-12 p-2 border rounded-md bg-gray-50 cursor-text ${formik.errors.ingredients && formik.touched.ingredients ? 'border-red-500' : 'border-gray-300'}`}
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {formik.values.ingredients.map((ingredient, index) => (
                                    <div key={index} className="bg-yellow-300 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
                                        <span>{ingredient}</span>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeIngredient(ingredient); }}
                                            className="text-gray-600 hover:text-gray-800 font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {dropdownOpen && (
                                <div className="absolute w-full bg-white shadow-lg border mt-2 rounded-md">
                                    {ingredientsList.map((ingredient, index) => (
                                        <div
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200"
                                            onClick={() => addIngredient(ingredient)}
                                        >
                                            {ingredient}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {formik.errors.ingredients && formik.touched.ingredients && <p className="text-red-500 text-sm">{formik.errors.ingredients}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="instructions" className="block text-gray-800 font-medium">Instructions</label>
                        <textarea
                            id="instructions"
                            value={formik.values.instructions}
                            onChange={formik.handleChange}
                            rows="5"
                            className={`w-full p-3 border rounded-md bg-gray-50 ${formik.errors.instructions && formik.touched.instructions ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {formik.errors.instructions && formik.touched.instructions && <p className="text-red-500 text-sm">{formik.errors.instructions}</p>}
                    </div>

                    <div className="space-y-1">
                        <label htmlFor="image" className="block text-gray-800 font-medium">Image de la recette</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-gray-700 text-sm w-full"
                        />
                        {formik.errors.imageBase64 && formik.touched.imageBase64 && <p className="text-red-500 text-sm">{formik.errors.imageBase64}</p>}

                        {imagePreview && (
                            <img src={imagePreview} alt="Aperçu" className="w-32 h-32 object-cover rounded-md border" />
                        )}

                    </div>

                    <button
                        type="button"
                        onClick={formik.handleSubmit}
                        className="w-full bg-yellow-400 p-3 rounded-md text-gray-800 font-bold hover:bg-yellow-500 transition-colors shadow-md"
                    >
                        Mettre à jour la recette
                    </button>
                </div>
            </div>
        );
    };
export default EditRecipeForm;
