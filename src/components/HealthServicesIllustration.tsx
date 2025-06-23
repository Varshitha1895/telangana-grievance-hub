
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Stethoscope, Ambulance, Hospital, Activity, Shield } from 'lucide-react';

const HealthServicesIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-2xl overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Medical Icons */}
        <motion.div
          animate={{ 
            y: [-10, 10, -10],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-8 left-8"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
            <Heart className="h-6 w-6 text-red-500" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [10, -10, 10],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute top-16 right-12"
        >
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
            <Stethoscope className="h-5 w-5 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            x: [-5, 5, -5],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-16"
        >
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg">
            <Activity className="h-4 w-4 text-yellow-600" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-12 right-20"
        >
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Main Illustration */}
      <div className="relative z-10 h-full flex items-center justify-between px-12">
        {/* Hospital Building */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-32 bg-gradient-to-t from-blue-500 to-blue-600 rounded-lg shadow-2xl relative"
            >
              {/* Hospital Cross */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-1 bg-red-500"></div>
                  <div className="w-1 h-4 bg-red-500 absolute"></div>
                </div>
              </div>
              
              {/* Windows */}
              <div className="absolute bottom-4 left-2 w-3 h-3 bg-yellow-300 rounded"></div>
              <div className="absolute bottom-4 right-2 w-3 h-3 bg-yellow-300 rounded"></div>
              <div className="absolute bottom-8 left-2 w-3 h-3 bg-yellow-300 rounded"></div>
              <div className="absolute bottom-8 right-2 w-3 h-3 bg-yellow-300 rounded"></div>
            </motion.div>
            
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mt-4 text-center"
            >
              <Hospital className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm font-semibold text-blue-700">Modern Hospitals</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Medical Staff */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Doctor */}
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-16 h-20 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-full relative">
              <div className="w-8 h-8 bg-yellow-200 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-12 h-12 bg-white rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Stethoscope className="h-6 w-6 text-gray-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </motion.div>

          {/* Nurse */}
          <motion.div
            animate={{ y: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="relative"
          >
            <div className="w-14 h-18 bg-gradient-to-b from-green-400 to-green-500 rounded-t-full relative">
              <div className="w-6 h-6 bg-yellow-200 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2"></div>
              <div className="w-8 h-8 bg-white rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <Heart className="h-4 w-4 text-red-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </motion.div>

          <p className="text-sm font-semibold text-green-700">Expert Care Team</p>
        </motion.div>

        {/* Ambulance */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ x: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative"
          >
            <div className="w-20 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-2xl relative overflow-hidden">
              {/* Ambulance Cross */}
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <div className="w-3 h-0.5 bg-red-500"></div>
                  <div className="w-0.5 h-3 bg-red-500 absolute"></div>
                </div>
              </div>
              
              {/* Windows */}
              <div className="absolute top-1 left-2 w-4 h-3 bg-blue-200 rounded"></div>
              
              {/* Wheels */}
              <div className="absolute -bottom-1 left-2 w-4 h-4 bg-gray-700 rounded-full"></div>
              <div className="absolute -bottom-1 right-2 w-4 h-4 bg-gray-700 rounded-full"></div>
            </div>
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="mt-4 text-center"
          >
            <Ambulance className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-red-700">Emergency Services</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated Health Pulse */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-green-500 to-red-400 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default HealthServicesIllustration;
