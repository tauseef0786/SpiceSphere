// const RecipeCard = ({ recipe }) => {
//     const { title, category, totalCalories, image, nutrients } = recipe;
  
//     return (
//       <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
//         <img src={image} alt={title} className="w-full h-48 object-cover" />
//         <div className="p-4 space-y-2">
//           <h2 className="text-xl font-semibold">{title}</h2>
//           <p className="text-sm text-gray-500">Category: {category}</p>
//           <p className="text-sm text-gray-600 font-medium">
//             Total Calories: {totalCalories} kcal
//           </p>
//           <div className="text-sm text-gray-700 grid grid-cols-2 gap-1">
//             <p>Protein: {nutrients.protein}g</p>
//             <p>Carbs: {nutrients.carbs}g</p>
//             <p>Fat: {nutrients.fat}g</p>
//             <p>Fiber: {nutrients.fiber}g</p>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   export default RecipeCard;
  


import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const { title, category, totalCalories, image, nutrients, _id } = recipe;

  const handleClick = () => {
    navigate(`/recipes/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg cursor-pointer"
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">Category: {category}</p>
        <p className="text-sm text-gray-600 font-medium">
          Total Calories: {totalCalories} kcal
        </p>
        <div className="text-sm text-gray-700 grid grid-cols-2 gap-1">
          <p>Protein: {nutrients.protein}g</p>
          <p>Carbs: {nutrients.carbs}g</p>
          <p>Fat: {nutrients.fat}g</p>
          <p>Fiber: {nutrients.fiber}g</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
