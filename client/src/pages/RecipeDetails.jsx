import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../apiClient";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRecipe = async () => {
    try {
      const res = await apiClient.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (err) {
      console.error("Error fetching recipe details:", err);
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        {/* Circular Loader */}
        <div className="loader"></div>
        <p className="loader-text">Loading recipe details...</p>
      </div>
    );
  }

  if (!recipe) {
    return <div className="text-center mt-10">Failed to load recipe details</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image with Blur */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${recipe.image})`,
          filter: "blur(6px)",
          opacity: 0.3,
        }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-6 bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <p className="text-lg text-gray-700 mb-2">
          <strong>Category:</strong> {recipe.category}
        </p>
        <p className="text-lg text-gray-700 mb-4">
          <strong>Total Calories:</strong> {recipe.totalCalories} kcal
        </p>

        {/* Ingredients First (2-column layout) */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-gray-700 list-disc list-inside">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Nutrients Next */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Nutrients</h2>
          <ul className="text-gray-700">
            <li>Protein: {recipe.nutrients.protein}g</li>
            <li>Carbs: {recipe.nutrients.carbs}g</li>
            <li>Fat: {recipe.nutrients.fat}g</li>
            <li>Fiber: {recipe.nutrients.fiber}g</li>
          </ul>
        </div>

        {/* Instructions Last */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <p className="whitespace-pre-line text-gray-800">{recipe.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
