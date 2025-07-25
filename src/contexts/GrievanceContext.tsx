
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

interface Grievance {
  id: string;
  category: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  media_images?: string[] | null;
  media_audio?: string | null;
  media_video?: string | null;
  category_specific?: Record<string, any> | null;
  user_id: string;
  updated_at?: string;
}

interface GrievanceContextType {
  grievances: Grievance[];
  loading: boolean;
  submitGrievance: (grievanceData: any) => Promise<string>;
  updateGrievanceStatus: (id: string, status: string) => Promise<void>;
  getUserGrievances: (userId: string) => Grievance[];
  refreshGrievances: () => Promise<void>;
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export const GrievanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, session } = useAuth();

  const fetchGrievances = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('grievances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching grievances:', error);
        return;
      }

      // Type cast the data to match our Grievance interface
      const typedData = (data || []).map(item => ({
        ...item,
        status: item.status as 'pending' | 'in-progress' | 'resolved',
        priority: item.priority as 'low' | 'medium' | 'high',
        category_specific: item.category_specific as Record<string, any> | null
      }));
      setGrievances(typedData);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshGrievances = async () => {
    await fetchGrievances();
  };

  useEffect(() => {
    if (session) {
      fetchGrievances();
    } else {
      setGrievances([]);
      setLoading(false);
    }
  }, [session]);

  const submitGrievance = async (grievanceData: any): Promise<string> => {
    if (!user) {
      throw new Error('User must be authenticated to submit grievances');
    }

    try {
      const grievanceToInsert = {
        category: grievanceData.category,
        description: grievanceData.description,
        location: grievanceData.location || 'Location not specified',
        status: 'pending' as const,
        priority: 'medium' as const,
        media_images: grievanceData.media?.images || null,
        media_audio: grievanceData.media?.audio || null,
        media_video: grievanceData.media?.video || null,
        category_specific: grievanceData.categorySpecific || null,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('grievances')
        .insert([grievanceToInsert])
        .select()
        .single();

      if (error) {
        console.error('Error submitting grievance:', error);
        throw error;
      }

      // Refresh grievances list
      await fetchGrievances();
      
      return data.id;
    } catch (error) {
      console.error('Error submitting grievance:', error);
      throw error;
    }
  };

  const updateGrievanceStatus = async (id: string, status: string) => {
    if (!user) {
      throw new Error('User must be authenticated to update grievances');
    }

    try {
      const { error } = await supabase
        .from('grievances')
        .update({ status: status as 'pending' | 'in-progress' | 'resolved' })
        .eq('id', id);

      if (error) {
        console.error('Error updating grievance status:', error);
        throw error;
      }

      // Update local state
      setGrievances(prev =>
        prev.map(grievance =>
          grievance.id === id
            ? { ...grievance, status: status as 'pending' | 'in-progress' | 'resolved' }
            : grievance
        )
      );
    } catch (error) {
      console.error('Error updating grievance status:', error);
      throw error;
    }
  };

  const getUserGrievances = (userId: string): Grievance[] => {
    return grievances.filter(grievance => grievance.user_id === userId);
  };

  return (
    <GrievanceContext.Provider value={{
      grievances,
      loading,
      submitGrievance,
      updateGrievanceStatus,
      getUserGrievances,
      refreshGrievances
    }}>
      {children}
    </GrievanceContext.Provider>
  );
};

export const useGrievance = () => {
  const context = useContext(GrievanceContext);
  if (context === undefined) {
    throw new Error('useGrievance must be used within a GrievanceProvider');
  }
  return context;
};
