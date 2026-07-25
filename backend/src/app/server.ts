import express, { Express } from "express";
import { registerRoutes } from "./routes";
import { handleError, handleNotFound } from "./middlewares";

export function createApp(): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: "1mb" }));
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    next();
  });

  registerRoutes(app);
  app.use(handleNotFound);
  app.use(handleError);
  return app;
}

const port = Number(process.env.PORT) || 4000;
const app = createApp();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
