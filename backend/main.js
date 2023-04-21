import express from "express";
import userRoutes from "./controllers/routes/userRoutes.js";
const app = express();

app.use(express.json());
app.use("/", userRoutes);
app.listen(3000, () => {
  console.log("running on port 3000");
});
