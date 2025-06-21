
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  uid: string;
  phoneNumber: string;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (phoneNumber: string, otp: string) => Promise<boolean>;
  logout: () => void;
  sendOtp: (phoneNumber: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const sendOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      // In a real app, this would integrate with Firebase Auth
      console.log('Sending OTP to:', phoneNumber);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      return false;
    }
  };

  const login = async (phoneNumber: string, otp: string): Promise<boolean> => {
    try {
      // In a real app, this would verify OTP with Firebase
      if (otp === '123456') {
        const newUser: User = {
          uid: 'demo-user-' + Date.now(),
          phoneNumber,
          isAuthenticated: true
        };
        setUser(newUser);
        localStorage.setItem('meeSaaradhiUser', JSON.stringify(newUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meeSaaradhiUser');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const savedUser = localStorage.getItem('meeSaaradhiUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, sendOtp }}>
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
