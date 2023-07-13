import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import corsOptions from "./config/cors.config";
import coordinatorRouter from "./src/routes/coordinator.routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import fs from "fs";
const customCss = fs.readFileSync("./swagger.css", "utf8");
import sequelizeConnection from "./config/sequelize.config";
const app: Express = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { customCss })
);
const startDatabase = async (): Promise<void> => {
  try {
    console.log("starting");
    await sequelizeConnection.sync();
    console.log("finished");
    await sequelizeConnection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("an error occurred");
    console.log(error);
  }
};
startDatabase();
app.use(coordinatorRouter);
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
