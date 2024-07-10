import express, { Express, Request, Response, Router } from "express";
import dotenv from "dotenv";
import ticketRouter from "./routes/Tickets";
import { createClient } from "@supabase/supabase-js";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL || "";
const dbKey = process.env.DB_KEY || "";
const supabase = createClient(dbUrl, dbKey);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  req.db = supabase;
  next();
});

app.use("/tickets", ticketRouter);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
