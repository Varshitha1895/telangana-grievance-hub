
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/20 blur-xl"
        />
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-40 right-20 w-24 h-24 rounded-full bg-pink-300/30 blur-lg"
        />
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-blue-300/40 blur-lg"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-yellow-300/30 blur-xl"
        />
      </div>

      <div className="text-center text-white px-6 relative z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.3)',
                '0 0 40px rgba(255,255,255,0.6)',
                '0 0 20px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-28 h-28 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl"
          >
            <motion.span 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🏛️
            </motion.span>
          </motion.div>
        </motion.div>
        
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          className="text-6xl font-bold mb-4 tracking-wide"
          style={{ textShadow: '0 4px 8px rgba(0,0,0,0.3)' }}
        >
          Mee Saaradhi
        </motion.h1>
        
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 1, ease: "easeOut" }}
          className="text-3xl mb-6 font-medium"
          style={{ 
            fontFamily: 'Noto Sans Telugu, sans-serif',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          మీ సారధి
        </motion.h2>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1, ease: "easeOut" }}
          className="text-xl opacity-90 max-w-md mx-auto leading-relaxed mb-2"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
        >
          Your Problem, Our Responsibility
        </motion.p>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 1, ease: "easeOut" }}
          className="text-lg opacity-80"
          style={{ 
            fontFamily: 'Noto Sans Telugu, sans-serif',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)'
          }}
        >
          మీ సమస్య, మా పరిష్కారం
        </motion.p>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
          className="mt-12"
        >
          <motion.div
            animate={{ 
              width: ['20%', '80%', '20%'],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-1 bg-white rounded-full mx-auto"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
