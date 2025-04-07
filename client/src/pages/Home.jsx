import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import RecipeCard from "../components/RecipeCard";
import CategoryList from "../components/CategoryList";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const res = await apiClient.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Error loading recipes:", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Tasty Dishes</h1>
      <div className="flex gap-6">
        {/* Left Side - Recipe Cards */}
        <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>

        {/* Right Side - Categories */}
        <div className="w-1/3 hidden md:block">
          <CategoryList recipes={recipes} />
        </div>
      </div>
    </div>
  );
};

export default Home;
