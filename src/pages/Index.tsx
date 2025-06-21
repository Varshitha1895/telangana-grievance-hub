
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import AuthScreen from '../components/AuthScreen';
import Dashboard from '../components/Dashboard';
import GrievanceForm from '../components/GrievanceForm';
import TrackComplaints from '../components/TrackComplaints';
import AdminPanel from '../components/AdminPanel';
import ChatSupport from '../components/ChatSupport';
import { LanguageProvider } from '../contexts/LanguageContext';
import { AuthProvider } from '../contexts/AuthContext';
import { GrievanceProvider } from '../contexts/GrievanceContext';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate splash screen duration
    const timer = setTimeout(() => {
      setCurrentScreen('auth');
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    setCurrentScreen('dashboard');
  };

  const navigateToScreen = (screen: string) => {
    setCurrentScreen(screen);
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <GrievanceProvider>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
            <AnimatePresence mode="wait">
              {currentScreen === 'splash' && (
                <SplashScreen key="splash" />
              )}
              
              {currentScreen === 'auth' && !isAuthenticated && (
                <AuthScreen 
                  key="auth" 
                  onAuthenticated={handleAuthentication}
                />
              )}
              
              {currentScreen === 'dashboard' && isAuthenticated && (
                <Dashboard 
                  key="dashboard" 
                  onNavigate={navigateToScreen}
                />
              )}
              
              {currentScreen === 'grievance' && isAuthenticated && (
                <GrievanceForm 
                  key="grievance" 
                  onBack={() => setCurrentScreen('dashboard')}
                />
              )}
              
              {currentScreen === 'track' && isAuthenticated && (
                <TrackComplaints 
                  key="track" 
                  onBack={() => setCurrentScreen('dashboard')}
                />
              )}
              
              {currentScreen === 'admin' && isAuthenticated && (
                <AdminPanel 
                  key="admin" 
                  onBack={() => setCurrentScreen('dashboard')}
                />
              )}
            </AnimatePresence>
            
            {isAuthenticated && <ChatSupport />}
          </div>
        </GrievanceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
