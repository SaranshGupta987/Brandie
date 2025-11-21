import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => { return res.send('Server Running...') });

app.use("/api", routes);

(async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
      console.log(`Swagger docs at http://localhost:${port}/docs`);
    });
  } catch (err) {
    console.error("Failed to start server", err);
    process.exit(1);
  }
})();