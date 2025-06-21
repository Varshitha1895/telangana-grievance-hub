
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Grievance {
  id: string;
  category: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  dateSubmitted: string;
  media?: {
    images?: string[];
    audio?: string;
    video?: string;
  };
  categorySpecific?: Record<string, any>;
  userId: string;
}

interface GrievanceContextType {
  grievances: Grievance[];
  submitGrievance: (grievanceData: any) => Promise<string>;
  updateGrievanceStatus: (id: string, status: string) => void;
  getUserGrievances: (userId: string) => Grievance[];
}

const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);

export const GrievanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: 'GRV001',
      category: 'road',
      description: 'Large pothole on Main Street causing traffic issues',
      location: 'Main Street, Hyderabad',
      status: 'in-progress',
      priority: 'high',
      dateSubmitted: '2024-01-15',
      userId: 'demo-user'
    },
    {
      id: 'GRV002',
      category: 'water',
      description: 'No water supply for 3 days in our locality',
      location: 'Sector 5, Kukatpally',
      status: 'resolved',
      priority: 'medium',
      dateSubmitted: '2024-01-10',
      userId: 'demo-user'
    }
  ]);

  const submitGrievance = async (grievanceData: any): Promise<string> => {
    try {
      const newGrievance: Grievance = {
        id: 'GRV' + String(grievances.length + 1).padStart(3, '0'),
        category: grievanceData.category,
        description: grievanceData.description,
        location: grievanceData.location || 'Location not specified',
        status: 'pending',
        priority: 'medium',
        dateSubmitted: new Date().toISOString().split('T')[0],
        media: grievanceData.media,
        categorySpecific: grievanceData.categorySpecific,
        userId: 'demo-user' // In real app, get from auth context
      };

      setGrievances(prev => [...prev, newGrievance]);
      
      // In a real app, this would save to Firebase Firestore
      console.log('Grievance submitted:', newGrievance);
      
      return newGrievance.id;
    } catch (error) {
      console.error('Error submitting grievance:', error);
      throw error;
    }
  };

  const updateGrievanceStatus = (id: string, status: string) => {
    setGrievances(prev =>
      prev.map(grievance =>
        grievance.id === id
          ? { ...grievance, status: status as 'pending' | 'in-progress' | 'resolved' }
          : grievance
      )
    );
  };

  const getUserGrievances = (userId: string): Grievance[] => {
    return grievances.filter(grievance => grievance.userId === userId);
  };

  return (
    <GrievanceContext.Provider value={{
      grievances,
      submitGrievance,
      updateGrievanceStatus,
      getUserGrievances
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
