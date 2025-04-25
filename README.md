# SpiceSphere

### 🔐 Demo Credentials

Use the following credentials to log in and explore the application:

- 📧 **Email**: `test1@gmail.com`  
- 🔑 **Password**: `123456`

SpiceSphere is a full-stack web application designed to bring food lovers and home chefs together. Users can share, discover, and explore a wide variety of recipes from around the world. The platform allows users to:

👨‍🍳 Register/Login securely using JWT authentication

📋 Add new recipes with categories, ingredients, and preparation steps

🍽️ View all recipes or filter them based on categories

🔍 See recipe details including image, description, and contributor

❤️ View My Dishes — recipes uploaded by the logged-in user

🛡️ Private routes for authenticated features

🌐 Fully responsive UI with dynamic backgrounds and elegant layout


---

## 🚀 Features

- User Registration & Login (JWT Auth)
- Add, View, and Explore Recipes
- Filter Recipes by Category
- View Individual Recipe Details
- Add Comments to Recipes
- Protected Routes using PrivateRoute
- Deployed on **Vercel**

---

## 🔧 Tech Stack

**Frontend:**
- React + Vite
- TailwindCSS
- React Router
- Context API (for auth management)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication

**Deployment:**
- Vercel (Frontend & Backend)

---

### 📸 Screenshots

| 🏠 Home Page | 📄 Recipe Details Page |
|-------------|------------------------|
| ![Home](https://github.com/user-attachments/assets/71fe8dd2-1676-468f-880c-613448967d9b) | ![Recipe](https://github.com/user-attachments/assets/c2f615b8-0d14-4883-8514-519bd374bd77) |

---

## 📦 Installation

### 🔐 Backend
```bash
cd server
npm install
npm run dev

### Folder Structure 

    SpiceSphere/
    │
    ├── client/                         # Frontend (React + Vite)
    │   ├── public/                     # Static files
    │   ├── src/
    │   │   ├── assets/                 # Images, icons, etc.
    │   │   ├── components/             # Reusable components
    │   │   │   ├── AddRecipe.jsx
    │   │   │   ├── AuthForm.jsx
    │   │   │   ├── Banner.jsx
    │   │   │   ├── CategoryList.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── MyDishes.jsx
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── PrivateRoute.jsx
    │   │   │   └── RecipeCard.jsx
    │   │   ├── pages/                  # Page-level components
    │   │   │   ├── Home.jsx
    │   │   │   ├── Login.jsx
    │   │   │   ├── RecipeDetails.jsx
    │   │   │   ├── Recipes.jsx
    │   │   │   └── Register.jsx
    │   │   ├── apiClient.js            # API handler
    │   │   ├── App.jsx
    │   │   ├── App.css
    │   │   ├── index.css
    │   │   └── main.jsx
    │   ├── .gitignore
    │   ├── index.html
    │   ├── package.json
    │   ├── package-lock.json
    │   ├── vite.config.js
    │   ├── vercel.json
    │   └── README.md
    │
    ├── server/                         # Backend (Node.js + Express)
    │   ├── config/
    │   │   └── db.js                   # MongoDB connection
    │   ├── controllers/
    │   │   ├── auth.controller.js
    │   │   └── recipe.controller.js
    │   ├── middleware/
    │   │   └── auth.middleware.js      # JWT middleware
    │   ├── models/
    │   │   ├── comment.model.js
    │   │   ├── recipe.model.js
    │   │   └── user.model.js
    │   ├── routes/
    │   │   ├── auth.routes.js
    │   │   └── recipe.routes.js
    │   ├── .env
    │   ├── .gitignore
    │   ├── index.js                    # Entry point
    │   ├── package.json
    │   ├── package-lock.json
    │   └── vercel.json
    │
    └── README.md                       # Main README
