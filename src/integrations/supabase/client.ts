// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xeyogwqiigvjdnfmcebg.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhleW9nd3FpaWd2amRuZm1jZWJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MjYwNjAsImV4cCI6MjA2NDUwMjA2MH0.wsc8B0titJyAMDyUWaxHEpvR19ZDcL0Aij2bMl292VI";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);