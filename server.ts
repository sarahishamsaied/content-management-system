import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./config/cors.config";

dotenv.config();
const app: Express = express();
app.use(cors(corsOptions));
const port = process.env.PORT || 3000;
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
