import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";

const Banner = () => {
  const [backgroundUrl, setBackgroundUrl] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await apiClient.get("/recipes");
        const recipes = res.data;

        // Filter recipes with images
        const withImages = recipes.filter(recipe => recipe.image);

        // Select random image
        if (withImages.length > 0) {
          const random = Math.floor(Math.random() * withImages.length);
          setBackgroundUrl(withImages[random].image);
        }
      } catch (err) {
        console.error("Failed to fetch recipes for banner:", err);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div
      className="bg-cover bg-center h-64 flex items-center justify-center text-white text-center transition-all duration-500"
      style={{
        backgroundImage: `url('${backgroundUrl || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1350&q=80"}')`,
      }}
    >
      <div className="bg-black bg-opacity-50 p-6 rounded">
        <h2 className="text-3xl font-bold mb-2">Welcome to Tasty Dishes</h2>
        <p className="text-sm">Discover recipes, share your own, and enjoy the flavor!</p>
      </div>
    </div>
  );
};

export default Banner;
