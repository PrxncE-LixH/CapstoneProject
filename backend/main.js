import express from "express";
import cors from 'cors'
import userRoutes from "./controllers/routes/userRoutes.js";
import setupJWTStrategy from "./auth/index.js";
import passport from "passport";

const app = express();

app.use(express.json());
app.use(cors())
setupJWTStrategy(passport)
app.use("/", userRoutes);
app.listen(3000, () => {
  console.log("running on port 3000");
});
