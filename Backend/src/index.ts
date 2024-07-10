import express, { Express } from "express";
import dotenv from "dotenv";
import ticketRouter from "./routes/Tickets";
import errorHandler from "./middleware/errorHandler";
import dbHandler from "./middleware/dbHandler";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(errorHandler);

app.use(dbHandler);

app.use("/tickets", ticketRouter);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
