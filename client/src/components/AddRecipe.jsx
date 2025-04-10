import { useState } from "react";
import { apiClient } from "../apiClient"; // update path if needed

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    category: "",
    image: "",
    totalCalories: "",
    nutrients: {
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["protein", "carbs", "fat", "fiber"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        nutrients: {
          ...prev.nutrients,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      ingredients,
      instructions,
      category,
      image,
      totalCalories,
      nutrients: { protein, carbs, fat, fiber },
    } = formData;

    // Validation
    if (!title || !ingredients || !instructions || !category || !totalCalories) {
      alert("Please fill in all required fields.");
      return;
    }

    const valuesToCheck = [totalCalories, protein, carbs, fat, fiber];
    const hasInvalid = valuesToCheck.some(
      (val) => isNaN(val) || Number(val) < 0
    );

    if (hasInvalid) {
      alert("Calories and nutrients must be non-negative numbers.");
      return;
    }

    // Construct recipe object
    const recipe = {
      ...formData,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      totalCalories: Number(totalCalories),
      nutrients: {
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        fiber: Number(fiber),
      },
    };

    try {
      const res = await apiClient.post("/recipes", recipe);
      alert("Recipe added successfully!");
      console.log("Recipe created:", res.data);

      // Reset form
      setFormData({
        title: "",
        ingredients: "",
        instructions: "",
        category: "",
        image: "",
        totalCalories: "",
        nutrients: {
          protein: "",
          carbs: "",
          fat: "",
          fiber: "",
        },
      });
    } catch (error) {
      console.error("Failed to add recipe:", error.response?.data || error.message);
      alert("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Recipe Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={formData.ingredients}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category (e.g., Dinner, Lunch)"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="number"
          name="totalCalories"
          placeholder="Total Calories"
          value={formData.totalCalories}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="protein"
            placeholder="Protein (g)"
            value={formData.nutrients.protein}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={formData.nutrients.carbs}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="fat"
            placeholder="Fat (g)"
            value={formData.nutrients.fat}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="number"
            name="fiber"
            placeholder="Fiber (g)"
            value={formData.nutrients.fiber}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-semibold"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
