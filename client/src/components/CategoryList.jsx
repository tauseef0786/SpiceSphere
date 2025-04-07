const CategoryList = ({ recipes }) => {
    const categories = [...new Set(recipes.map(r => r.category))];
  
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        {categories.map((cat) => (
          <div key={cat} className="mb-4">
            <h3 className="text-lg font-medium text-blue-600">{cat}</h3>
            <ul className="ml-2 list-disc text-sm text-gray-700">
              {recipes
                .filter(r => r.category === cat)
                .map((r) => (
                  <li key={r._id}>{r.title}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };
  
  export default CategoryList;
  