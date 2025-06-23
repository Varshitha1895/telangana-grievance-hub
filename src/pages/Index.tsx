
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
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { GrievanceProvider } from '../contexts/GrievanceContext';

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Handle splash screen duration
    const timer = setTimeout(() => {
      if (!isLoading) {
        // If user is already authenticated, go directly to dashboard
        if (user) {
          setCurrentScreen('dashboard');
        } else {
          setCurrentScreen('auth');
        }
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [user, isLoading]);

  // Handle authentication changes
  useEffect(() => {
    if (!isLoading && currentScreen !== 'splash') {
      if (user && currentScreen === 'auth') {
        setCurrentScreen('dashboard');
      } else if (!user && currentScreen !== 'auth') {
        setCurrentScreen('auth');
      }
    }
  }, [user, isLoading, currentScreen]);

  const handleAuthentication = () => {
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
        
        {currentScreen === 'auth' && !user && (
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
        
        {currentScreen === 'dashboard' && user && (
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
        
        {currentScreen === 'grievance' && user && (
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
        
        {currentScreen === 'health' && user && (
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
        
        {currentScreen === 'track' && user && (
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
        
        {currentScreen === 'admin' && user && (
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
        
        {currentScreen === 'emergency' && user && (
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
        
        {currentScreen === 'guide' && user && (
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
      
      {user && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ChatSupport />
        </motion.div>
      )}
    </motion.div>
  );
};

const Index = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <GrievanceProvider>
          <AppContent />
        </GrievanceProvider>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default Index;
