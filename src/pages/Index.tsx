
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from '../components/SplashScreen';
import AuthScreen from '../components/AuthScreen';
import Dashboard from '../components/Dashboard';
import GrievanceForm from '../components/GrievanceForm';
import TrackComplaints from '../components/TrackComplaints';
import AdminPanel from '../components/AdminPanel';
import EmergencySupport from '../components/EmergencySupport';
import ServiceGuide from '../components/ServiceGuide';
import ChatSupport from '../components/ChatSupport';
import HealthServicesComplaint from '../components/HealthServicesComplaint';
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

  const pageTransition = {
    duration: 0.8
  };

  const pageVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.9,
      y: 50
    },
    in: { 
      opacity: 1, 
      scale: 1,
      y: 0
    },
    out: { 
      opacity: 0, 
      scale: 1.1,
      y: -50
    }
  };

  return (
    <LanguageProvider>
      <AuthProvider>
        <GrievanceProvider>
          <motion.div 
            className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <AnimatePresence mode="wait">
              {currentScreen === 'splash' && (
                <motion.div
                  key="splash"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <SplashScreen />
                </motion.div>
              )}
              
              {currentScreen === 'auth' && !isAuthenticated && (
                <motion.div
                  key="auth"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <AuthScreen onAuthenticated={handleAuthentication} />
                </motion.div>
              )}
              
              {currentScreen === 'dashboard' && isAuthenticated && (
                <motion.div
                  key="dashboard"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <Dashboard onNavigate={navigateToScreen} />
                </motion.div>
              )}
              
              {currentScreen === 'grievance' && isAuthenticated && (
                <motion.div
                  key="grievance"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <GrievanceForm onBack={() => setCurrentScreen('dashboard')} />
                </motion.div>
              )}
              
              {currentScreen === 'health' && isAuthenticated && (
                <motion.div
                  key="health"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <HealthServicesComplaint 
                    onBack={() => setCurrentScreen('dashboard')}
                    onSubmit={() => setCurrentScreen('dashboard')}
                  />
                </motion.div>
              )}
              
              {currentScreen === 'track' && isAuthenticated && (
                <motion.div
                  key="track"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <TrackComplaints onBack={() => setCurrentScreen('dashboard')} />
                </motion.div>
              )}
              
              {currentScreen === 'admin' && isAuthenticated && (
                <motion.div
                  key="admin"
                  initial="initial"
                  animate="in"
                  exit="out"  
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <AdminPanel onBack={() => setCurrentScreen('dashboard')} />
                </motion.div>
              )}
              
              {currentScreen === 'emergency' && isAuthenticated && (
                <motion.div
                  key="emergency"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <EmergencySupport onBack={() => setCurrentScreen('dashboard')} />
                </motion.div>
              )}
              
              {currentScreen === 'guide' && isAuthenticated && (
                <motion.div
                  key="guide"
                  initial="initial"
                  animate="in"
                  exit="out"
                  variants={pageVariants}
                  transition={pageTransition}
                >
                  <ServiceGuide onBack={() => setCurrentScreen('dashboard')} />
                </motion.div>
              )}
            </AnimatePresence>
            
            {isAuthenticated && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <ChatSupport />
              </motion.div>
            )}
          </motion.div>
        </GrievanceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
