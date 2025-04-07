import Recipe from "../models/recipe.model.js";

// Create a new recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, category, image, totalCalories, nutrients } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      instructions,
      category,
      image,
      totalCalories,
      nutrients,
      likes: [], // ✅ Initialize as empty array
      createdBy: req.user.userId
    });

    await newRecipe.save();
    res.status(201).json({ message: "Recipe created successfully!", recipe: newRecipe });
  } catch (error) {
    res.status(500).json({ message: "Error creating recipe", error });
  }
};

// Get all recipes
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("createdBy", "name email");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipes", error });
  }
};

// Get a single recipe
export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate("createdBy", "name email");
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recipe", error });
  }
};

// Update a recipe (Only owner or admin)
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only the creator or admin can update
    if (recipe.createdBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this recipe" });
    }

    Object.assign(recipe, req.body);
    await recipe.save();
    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (error) {
    res.status(500).json({ message: "Error updating recipe", error });
  }
};

// Delete a recipe (Only owner or admin)
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    // Only the creator or admin can delete
    if (recipe.createdBy.toString() !== req.user.userId && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this recipe" });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting recipe", error });
  }
};

// Like a recipe (User can like only once)
export const likeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    if (!Array.isArray(recipe.likes)) {
      recipe.likes = [];
    }

    // Check if user already liked
    if (recipe.likes.includes(req.user.userId)) {
      return res.status(400).json({ message: "You have already liked this recipe" });
    }

    recipe.likes.push(req.user.userId);
    await recipe.save();
    res.status(200).json({ message: "Recipe liked successfully", likes: recipe.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Error liking recipe", error });
  }
};

// Unlike a recipe
export const unlikeRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    recipe.likes = recipe.likes.filter(userId => userId.toString() !== req.user.userId);
    await recipe.save();
    res.status(200).json({ message: "Recipe unliked successfully", likes: recipe.likes.length });
  } catch (error) {
    res.status(500).json({ message: "Error unliking recipe", error });
  }
};
