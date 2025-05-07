import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js"; 
import recipeRoutes from "./routes/recipe.routes.js";
import cors from "cors"


dotenv.config();
const app=express();

app.use(express.json());
connectDB();

const corsOptions = {
  origin: '*',  // Allow any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Welcome to the Recipe API");
});

  
app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);
const port =process.env.PORT;

app.listen(port,()=>{
    console.log(`server connected on PORT ${port}`)
});
