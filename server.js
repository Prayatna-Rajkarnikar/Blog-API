import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dbConnect } from "./mongo/dbConnection.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(morgan("combined"));
app.use(cookieParser());

dbConnect();

app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server connected successfully on PORT: ${process.env.PORT}`);
});
