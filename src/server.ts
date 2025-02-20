import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.config";
import authenticationRoutes from "./routes/authentication.routes";
import productRoutes from "./routes/product.route";
import "reflect-metadata";

const app: Express = express();

// cors
app.use(cors());

// config env
dotenv.config();

//json parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send(`Welcome to Express, Typescript and MongoDB`);
});

app.use("/api", authenticationRoutes);
app.use("/api/products", productRoutes);

const port = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
