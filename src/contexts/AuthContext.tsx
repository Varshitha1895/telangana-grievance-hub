import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  age?: number;
  aadhaar_number?: string;
  pan_number?: string;
  date_of_birth?: string;
  profile_photo_url?: string;
  phone_number?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, profileData: Partial<UserProfile>) => Promise<{ error: any }>;
  signupWithGoogle: () => Promise<{ error: any }>;
  logout: () => void;
  uploadProfilePhoto: (file: File) => Promise<{ url?: string; error?: any }>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile
          setTimeout(async () => {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', session.user.id)
              .single();
            
            if (profileData) {
              setProfile(profileData);
            }
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (email: string, password: string, profileData: Partial<UserProfile>) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) return { error };

      if (data.user && profileData.full_name) {
        // Create profile after successful signup - ensure full_name is always provided
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            user_id: data.user.id,
            full_name: profileData.full_name,
            age: profileData.age,
            aadhaar_number: profileData.aadhaar_number,
            pan_number: profileData.pan_number,
            date_of_birth: profileData.date_of_birth,
            profile_photo_url: profileData.profile_photo_url,
            phone_number: profileData.phone_number
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      return { error: null };
    } catch (error) {
      console.error('Signup error:', error);
      return { error };
    }
  };

  const signupWithGoogle = async () => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl
        }
      });

      return { error };
    } catch (error) {
      console.error('Google signup error:', error);
      return { error };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { error };
    } catch (error) {
      console.error('Login error:', error);
      return { error };
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const uploadProfilePhoto = async (file: File) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/profile.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(fileName, file, { upsert: true });

      if (uploadError) return { error: uploadError };

      const { data } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(fileName);

      return { url: data.publicUrl };
    } catch (error) {
      console.error('Upload error:', error);
      return { error };
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      // Ensure we have the required full_name field
      const updateData: any = {
        user_id: user.id,
        ...profileData
      };

      // If full_name is provided, include it; otherwise keep existing
      if (profileData.full_name) {
        updateData.full_name = profileData.full_name;
      } else if (profile?.full_name) {
        updateData.full_name = profile.full_name;
      } else {
        return { error: 'Full name is required' };
      }

      const { error } = await supabase
        .from('profiles')
        .upsert(updateData);

      if (!error) {
        setProfile(prev => prev ? { ...prev, ...profileData } : null);
      }

      return { error };
    } catch (error) {
      console.error('Profile update error:', error);
      return { error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      profile, 
      login, 
      signup, 
      signupWithGoogle, 
      logout, 
      uploadProfilePhoto, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
