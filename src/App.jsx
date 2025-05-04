



import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecetteDetail from './pages/RecetteDetail'
import NavBar from './components/layout/NavBar';
import EditRecipeForm from './components/admin/EditRecipeForm';
import Register from './pages/Register';
import Login from './pages/Loging';
import AdminRecettesList from './components/admin/AdminRecettesList';
import ProtectedRoute from './components/layout/ProtectedRoute'
import Dashboard from './components/admin/Dashboard';
import RecipeForm from './components/admin/RecettForm';
import Footer from './components/layout/Footer';
import About from './pages/About';
import { Toaster } from 'react-hot-toast';
import { Import } from 'lucide-react';


function App() {
  return (
    <div className="min-h-screen w-full bg-gray-100">
      <NavBar />
      <Toaster position="top-center" />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recette/:id" element={<RecetteDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/RecipeForm"
            element={
              <ProtectedRoute role="admin">
                <RecipeForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/AdminRecettesList"
            element={
              <ProtectedRoute role="admin">
                
                <AdminRecettesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recettes/:id/edit"
            element={
              <ProtectedRoute role="admin">
                <EditRecipeForm />
              </ProtectedRoute>
            }
          />
         

        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
