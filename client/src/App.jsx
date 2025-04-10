import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AddRecipe from "./components/AddRecipe";
import MyDishes from "./components/MyDishes";
import Footer from "./components/Footer"; 

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
       
        <Navbar />
         {/* Optional banner at top */}
        <div className="flex-grow pt-20">
       
          <Routes>
            <Route path="/add-dish" element={<AddRecipe />} />
            <Route path="/my-dishes" element={<MyDishes />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            <Route
              path="/recipes"
              element={
                <PrivateRoute>
                  <Recipes />
                </PrivateRoute>
              }
            />
            <Route
              path="/recipes/:id"
              element={
                <PrivateRoute>
                  <RecipeDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
