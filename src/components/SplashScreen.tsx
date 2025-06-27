
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500"
    >
      <div className="text-center text-white px-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-3xl">🏛️</span>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl font-bold mb-4 tracking-wide"
        >
          Mee Saaradhi
        </motion.h1>
        
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-2xl mb-6 font-medium"
          style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}
        >
          మీ సారధి
        </motion.h2>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg opacity-90 max-w-md mx-auto leading-relaxed"
        >
          Your Problem, Our Responsibility
        </motion.p>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="text-base opacity-80 mt-2"
          style={{ fontFamily: 'Noto Sans Telugu, sans-serif' }}
        >
          మీ సమస్య, మా పరిష్కారం
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-8"
        >
          <div className="w-16 h-1 bg-white rounded-full mx-auto animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
