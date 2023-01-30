import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_URL,
  process.env.REACT_APP_PUBLIC
);

export default supabase;
