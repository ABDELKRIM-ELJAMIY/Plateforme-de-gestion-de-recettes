import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RecetteDetail from './components/RecetteDetail';
import NavBar from './components/NavBar';
import RecipeForm from './components/admin/RecettForm';
// import Fetch from './components/importing';
import Register from './components/Register';
import Login from './components/Loging';
import AdminRecettesList from './components/admin/AdminRecettesList';
import EditRecipeForm from './components/admin/EditRecipeForm';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <NavBar />
      <Toaster position="top-center" />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RecipeForm" element={<RecipeForm />} />
          {/* <Route path="/recette/det" element={<RecetteDetail />} /> */}
          <Route path="/recette/:id" element={<RecetteDetail />} />
          {/* <Route path="/Fetch" element={<Fetch />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminRecettesList" element={<AdminRecettesList/>} />
          {/* <Route path="/admin/recettes/edit/:id" element={<RecipeEditForm />} />
           */}
          <Route path="/recettes/:id/edit" element={<EditRecipeForm />} />


          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* <Route path="/create" element={<ArticleForm />} /> */}
          {/* <Route path="/recette/:id/edit" element={<ArticleForm />} /> */}
        
        </Routes>
      </div>
    </div>
  );
}

export default App;
