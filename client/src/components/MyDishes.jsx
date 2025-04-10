import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import { useNavigate } from "react-router-dom";

const MyDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const navigate = useNavigate();

  const fetchMyRecipes = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first.");
        return;
      }

      const res = await apiClient.get("/recipes/my-recipes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching your recipes:", error.message);
      alert("Failed to fetch your recipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await apiClient.delete(`/recipes/${_id}`);
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== _id));
        alert("Recipe deleted successfully.");
      } catch (error) {
        console.error("Delete error:", error.message);
        alert("Failed to delete recipe.");
      }
    }
  };

  const handleEditClick = (recipe) => {
    // Convert ingredients array to string for editing
    const editableRecipe = {
      ...recipe,
      ingredients: Array.isArray(recipe.ingredients)
        ? recipe.ingredients.join(", ")
        : recipe.ingredients || "",
      nutrients: recipe.nutrients || {
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
      },
    };
    setEditingRecipe(editableRecipe);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    if (["protein", "carbs", "fat", "fiber"].includes(name)) {
      setEditingRecipe((prev) => ({
        ...prev,
        nutrients: {
          ...prev.nutrients,
          [name]: value,
        },
      }));
    } else {
      setEditingRecipe((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const {
      _id,
      title,
      ingredients,
      instructions,
      category,
      image,
      totalCalories,
      nutrients,
    } = editingRecipe;

    const updatedRecipe = {
      title,
      ingredients: typeof ingredients === "string"
        ? ingredients.split(",").map((item) => item.trim())
        : ingredients,
      instructions,
      category,
      image,
      totalCalories: Number(totalCalories),
      nutrients: {
        protein: Number(nutrients?.protein),
        carbs: Number(nutrients?.carbs),
        fat: Number(nutrients?.fat),
        fiber: Number(nutrients?.fiber),
      },
    };

    try {
      await apiClient.put(`/recipes/${_id}`, updatedRecipe);
      alert("Recipe updated successfully!");

      // Update local state
      setRecipes((prev) =>
        prev.map((r) => (r._id === _id ? { ...r, ...updatedRecipe } : r))
      );

      setEditingRecipe(null);
    } catch (error) {
      console.error("Failed to update recipe:", error.message);
      alert("Failed to update recipe.");
    }
  };

  const handleCancelEdit = () => {
    setEditingRecipe(null);
  };

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-lg text-gray-500 animate-pulse">
          Loading your dishes...
        </p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">No recipes added yet.</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">🍽️ My Dishes</h2>

      {/* Edit Modal */}
      {editingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4 text-center">Edit Recipe</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={editingRecipe.title}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="ingredients"
                placeholder="Ingredients (comma-separated)"
                value={editingRecipe.ingredients}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <textarea
                name="instructions"
                placeholder="Instructions"
                value={editingRecipe.instructions}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={editingRecipe.category}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={editingRecipe.image}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="totalCalories"
                placeholder="Total Calories"
                value={editingRecipe.totalCalories}
                onChange={handleEditChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="grid grid-cols-2 gap-4">
                {["protein", "carbs", "fat", "fiber"].map((nutrient) => (
                  <input
                    key={nutrient}
                    type="number"
                    name={nutrient}
                    placeholder={`${nutrient.charAt(0).toUpperCase() + nutrient.slice(1)} (g)`}
                    value={editingRecipe.nutrients?.[nutrient] || ""}
                    onChange={handleEditChange}
                    className="border px-3 py-2 rounded"
                  />
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Recipe List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 ">
        {recipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-white shadow-md rounded-lg overflow-hidden "
          >
            <img
              src={recipe.image || "https://via.placeholder.com/300"}
              alt={recipe.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold text-green-700">
                {recipe.title}
              </h3>
              <p className="text-gray-600 text-sm">
                Category: {recipe.category}
              </p>
              <p className="text-gray-700 text-sm">
                Total Calories: {recipe.totalCalories} kcal
              </p>
              <div className="text-sm text-gray-600">
                <p>Protein: {recipe.nutrients?.protein}g</p>
                <p>Carbs: {recipe.nutrients?.carbs}g</p>
                <p>Fat: {recipe.nutrients?.fat}g</p>
                <p>Fiber: {recipe.nutrients?.fiber}g</p>
              </div>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => handleEditClick(recipe)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(recipe._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDishes;
