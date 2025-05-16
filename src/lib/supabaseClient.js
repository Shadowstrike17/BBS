
    import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://ryvdmcnfejaepoineohz.supabase.co';
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5dmRtY25mZWphZXBvaW5lb2h6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjIxNDcsImV4cCI6MjA2Mjg5ODE0N30.dml-5y6bjPfRYfT_2nd7JzkI205hCD_Yan2P0RXcej8';

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error("Supabase URL and Anon Key are required.");
    }
    
    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
  