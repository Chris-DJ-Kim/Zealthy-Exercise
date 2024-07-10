import { NextFunction, Request, Response } from "express";

import { createClient } from "@supabase/supabase-js";

const dbUrl = process.env.DB_URL || "";
const dbKey = process.env.DB_KEY || "";
const supabase = createClient(dbUrl, dbKey);

const dbHandler = async (req: Request, res: Response, next: NextFunction) => {
  const email = process.env.DB_EMAIL || "";
  const password = process.env.DB_PASSWORD || "";
  await supabase.auth.signInWithPassword({
    email,
    password,
  });
  req.db = supabase;
  next();
};

export default dbHandler;
