import { SupabaseClient } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      db: SupabaseClient;
    }
  }
}
