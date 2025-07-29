import express from "express";
import aiRoutes from "./routes/ai.routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json()); // Middleware to parse JSON bodies(for req.body)

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use("/ai", aiRoutes);

export default app;
