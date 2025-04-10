import { Link } from "react-router-dom";

const CategoryList = ({ recipes }) => {
  const categories = [...new Set(recipes.map((r) => r.category))];
  const randomDishes = [...recipes].sort(() => 0.5 - Math.random()).slice(0, 6); // Pick 6 random dishes

  return (
    <div className="flex flex-col gap-4">
      {/* Categories Box - Height Increased */}
      <div className="bg-orange-50 p-6 rounded-2xl border  max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-orange-700">🍽️ Recipe Categories</h2>
        {categories.map((cat) => (
          <div key={cat} className="mb-5">
            <h3 className="text-lg font-semibold text-orange-600 mb-2">{cat}</h3>
            <ul className="ml-4 space-y-1">
              {recipes
                .filter((r) => r.category === cat)
                .map((r) => (
                  <li key={r._id}>
                    <Link
                      to={`/recipes/${r._id}`}
                      className="text-gray-800 hover:text-orange-500 transition underline-offset-4 hover:underline font-medium"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Random Dish Images - Clickable */}
      <div className="bg-white p-4 rounded-2xl border border-orange-200 max-h-[60vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-orange-700 mb-4">🍛 Random Tasty Dishes</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {randomDishes.map((dish) => (
            <Link to={`/recipes/${dish._id}`} key={dish._id} className="block group">
              <div className="rounded-lg overflow-hidden">
                <img
                  src={dish.image || "https://via.placeholder.com/300x200?text=Dish"}
                  alt={dish.title}
                  className="w-full h-28 object-cover rounded-lg group-hover:scale-105 transition duration-300"
                />
              </div>
              <p className="text-sm text-center mt-1 font-medium text-gray-700 group-hover:text-orange-600">
                {dish.title}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
