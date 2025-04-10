import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import RecipeCard from "../components/RecipeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const res = await apiClient.get("/recipes");
      setRecipes(res.data);
    } catch (err) {
      console.error("Failed to fetch recipes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const healthyIndianFoods = recipes.filter(
    (r) =>
      r.title?.toLowerCase().includes("healthy") ||
      r.title?.toLowerCase().includes("indian") ||
      r.category?.toLowerCase().includes("healthy") ||
      r.category?.toLowerCase().includes("indian")
  );

  const otherRecipes = recipes.filter((r) => !healthyIndianFoods.includes(r));

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Healthy & Indian Food Slideshow */}
      {healthyIndianFoods.length > 0 && (
        <>
          <h2 className="text-3xl font-bold text-center py-6">Healthy & Indian Foods</h2>
          <div className="w-full mb-12">
            <Slider {...sliderSettings}>
              {healthyIndianFoods.map((item) => (
                <div key={item._id} className="w-full relative">
                  <Link to={`/recipes/${item._id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-lg"
                    />
                    <div className="absolute bottom-6 left-6 bg-black bg-opacity-50 text-white px-4 py-2 rounded">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}

      {/* Newly Added Dishes Scroll */}
      <div className="px-6 py-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Newly Added Dishes</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading recipes...</p>
        ) : otherRecipes.length === 0 ? (
          <p className="text-center text-red-500">No recipes found.</p>
        ) : (
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth">
            {otherRecipes.slice(0, 10).map((recipe) => (
              <div key={recipe._id} className="min-w-[280px] max-w-[300px]">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
