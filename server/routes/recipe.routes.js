import express from "express";
import { 
  createRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe, likeRecipe, unlikeRecipe 
} from "../controllers/recipe.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createRecipe); // Create recipe
router.get("/", getAllRecipes); // Get all recipes
router.get("/:id", getRecipeById); // Get single recipe
router.put("/:id", authMiddleware, updateRecipe); // Update recipe (only owner/admin)
router.delete("/:id", authMiddleware, deleteRecipe); // Delete recipe (only owner/admin)
router.post("/:id/like", authMiddleware, likeRecipe); // Like a recipe
router.post("/:id/unlike", authMiddleware, unlikeRecipe); // Unlike a recipe

export default router;
