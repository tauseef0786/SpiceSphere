import { useEffect, useState } from "react";
import { apiClient } from "../apiClient";
import RecipeCard from "../components/RecipeCard";
import CategoryList from "../components/CategoryList";
import Banner from "../components/Banner";
import { FaArrowDown } from "react-icons/fa"; // <-- Added

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await apiClient.get("/recipes");
        setRecipes(res.data);
      } catch (err) {
        console.error("Error loading recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const getFilteredRecipes = () => {
    let data = [...recipes];
    if (searchTerm.trim()) {
      data = data.filter((recipe) =>
        recipe?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (sortOption === "name-asc") {
      data.sort((a, b) => a?.title?.localeCompare(b?.title));
    } else if (sortOption === "name-desc") {
      data.sort((a, b) => b?.title?.localeCompare(a?.title));
    }
    return data;
  };

  const filteredRecipes = getFilteredRecipes();

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecipes = filteredRecipes.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption]);

  return (
    <div className="min-h-screen p-6">
      <Banner />
      <h1 className="text-3xl font-bold mb-6 text-center">Tasty Dishes</h1>

      <div className="flex gap-6">
        {/* Left Side */}
        <div className="w-full md:w-2/3">
          {/* Search & Sort Controls */}
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/2"
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border p-2 rounded w-full sm:w-1/3"
            >
              <option value="">Sort by</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
            </select>
          </div>

          {/* Recipe Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>

          {/* Updated Pagination */}
          <div className="flex justify-center mt-6 gap-2 flex-wrap">
            {currentPage < totalPages && (
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                <FaArrowDown className="animate-bounce" />
                <span>See More</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side - Categories */}
        <div className="w-1/3 hidden md:block">
          <CategoryList recipes={recipes} />
        </div>
      </div>
<div className="mt-12">
  <h2 className="text-2xl font-bold text-center mb-6">Health Tips & Tricks</h2>

  {/* Tip 1 */}
  <div className="flex flex-col md:flex-row gap-6 mb-10 items-center">
    <img
      src="https://images.everydayhealth.com/images/diet-nutrition/whole-foods-diet-101-1440x810.jpg
      "
      alt="Healthy Eating"
      className="w-half md:w-1/2 rounded-lg shadow-md"
    />
    <div className="w-full md:w-1/2 space-y-4">
      <h3 className="text-xl font-semibold text-orange-600">1. Eat More Whole Foods</h3>
      <p className="text-gray-700">
        Whole foods such as vegetables, fruits, nuts, seeds, legumes, and whole grains are rich in
        fiber, vitamins, and minerals. These foods support your immune system, promote better
        digestion, and help in weight management. Try replacing processed snacks with fresh fruit or
        nuts for sustained energy throughout the day.
      </p>
    </div>
  </div>

  {/* Tip 2 */}
  <div className="flex flex-col md:flex-row-reverse gap-6 mb-10 items-center">
    <img
      src="https://veg.fit/wp-content/uploads/2018/04/Drink-water-Stay-Hydrated_VegFit.png"
      alt="Stay Hydrated"
      className="w-full md:w-1/2 rounded-lg shadow-md"
    />
    <div className="w-full md:w-1/2 space-y-4">
      <h3 className="text-xl font-semibold text-orange-600">2. Stay Hydrated</h3>
      <p className="text-gray-700">
        Drinking enough water throughout the day keeps your body hydrated, flushes out toxins, and
        helps regulate body temperature. It can also improve concentration, mood, and skin
        appearance. Carry a reusable water bottle with you to stay mindful of your intake. Aim for at
        least 2–3 liters per day, depending on your activity level and climate.
      </p>
    </div>
  </div>

  {/* Tip 3 */}
  <div className="flex flex-col md:flex-row gap-6 mb-10 items-center">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHjC2AAX5NJrjzTu6WW5X_nFqvwGlkwOW0Q&s"
      alt="Exercise Daily"
      className="w-full md:w-1/2 rounded-lg shadow-md"
    />
    <div className="w-full md:w-1/2 space-y-4">
      <h3 className="text-xl font-semibold text-orange-600">3. Move Your Body Daily</h3>
      <p className="text-gray-700">
        Physical activity doesn’t have to mean a full workout. A 30-minute walk, light yoga, or
        stretching can greatly improve cardiovascular health, reduce stress, and enhance mood.
        Exercise releases endorphins — natural mood boosters — and helps you sleep better at night.
        Try incorporating movement into your routine by walking during calls or taking the stairs.
      </p>
    </div>
  </div>

  {/* Tip 4 */}
  <div className="flex flex-col md:flex-row-reverse gap-6 mb-10 items-center">
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVCmiUi7siM7rL5qv9rBx7UBNBi8Id0CuBg&s
      "
      alt="Sleep Well"
      className="w-full md:w-1/2 rounded-lg shadow-md"
    />
    <div className="w-full md:w-1/2 space-y-4">
      <h3 className="text-xl font-semibold text-orange-600">4. Prioritize Good Sleep</h3>
      <p className="text-gray-700">
        Quality sleep is just as important as diet and exercise. Poor sleep can lead to hormonal
        imbalances, increased stress, and lowered immunity. Create a bedtime routine, avoid screens
        before sleeping, and aim for 7–8 hours of restful sleep per night. A well-rested mind leads
        to better decisions and increased productivity during the day.
      </p>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home;
