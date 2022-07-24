import express from "express";
import cors from "cors";
import { router } from "./router/index.js";

const app = express();

app.use(express.json());
app.use(cors());

router(app);

app.use((error, req, res, next) => {
  res.status(500).send({
    code: 500,
    message: error,
  });
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});

export default app;
