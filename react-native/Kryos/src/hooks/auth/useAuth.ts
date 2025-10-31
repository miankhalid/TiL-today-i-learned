import type { Session, SignInWithPasswordCredentials, SignUpWithPasswordCredentials } from '@supabase/supabase-js';

import { useEffect, useState } from 'react';

import { supabase } from '@/services/supabase';

export const login = async (credentials: SignInWithPasswordCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signup = async (credentials: SignUpWithPasswordCredentials) => {
  const { data, error } = await supabase.auth.signUp(credentials);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

export const useAuth = () => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      if (!supabase) {
        console.error('Supabase client is not initialized.');
        setLoading(false);
        return;
      }
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? undefined);
      setLoading(false);
    };

    void getSession();

    if (!supabase) {
      console.error('Supabase client is not initialized, cannot set up auth listener.');
      return;
    }
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? undefined);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { loading, session };
};
