
import React from 'react';
import { motion } from 'framer-motion';
import { Building, TrendingUp, Users, Zap, Factory, BarChart3 } from 'lucide-react';

const InvestorsIllustration: React.FC = () => {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-50 via-white to-orange-50 rounded-2xl overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-white/20 to-orange-500/10"></div>

      {/* Floating Business Icons */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [-8, 8, -8],
            rotate: [0, 10, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-6 left-8"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            x: [5, -5, 5],
            y: [-5, 5, -5],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-12 right-12"
        >
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
            <BarChart3 className="h-4 w-4 text-green-600" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-16 left-12"
        >
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center shadow-lg">
            <Factory className="h-6 w-6 text-orange-600" />
          </div>
        </motion.div>

        <motion.div
          animate={{ 
            y: [10, -10, 10],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 3 }}
          className="absolute bottom-8 right-16"
        >
          <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center shadow-lg">
            <Zap className="h-4 w-4 text-purple-600" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-between px-8">
        {/* Smart City Infrastructure */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Glass Buildings */}
          <div className="flex space-x-2">
            <motion.div
              animate={{ 
                scaleY: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-8 h-24 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg shadow-xl relative"
            >
              {/* Building windows */}
              <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-yellow-300 rounded"></div>
              <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-yellow-300 rounded"></div>
              <div className="absolute top-5 left-1 w-1.5 h-1.5 bg-yellow-300 rounded"></div>
              <div className="absolute top-5 right-1 w-1.5 h-1.5 bg-yellow-300 rounded"></div>
            </motion.div>

            <motion.div
              animate={{ 
                scaleY: [1, 1.08, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="w-10 h-32 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg shadow-xl relative"
            >
              <div className="absolute top-2 left-1 w-2 h-2 bg-white rounded"></div>
              <div className="absolute top-2 right-1 w-2 h-2 bg-white rounded"></div>
              <div className="absolute top-6 left-1 w-2 h-2 bg-white rounded"></div>
              <div className="absolute top-6 right-1 w-2 h-2 bg-white rounded"></div>
              
              {/* Solar panels on top */}
              <div className="absolute -top-1 left-0 w-full h-2 bg-gray-800 rounded-t-lg"></div>
            </motion.div>

            <motion.div
              animate={{ 
                scaleY: [1, 1.03, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="w-6 h-20 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg shadow-xl relative"
            >
              <div className="absolute top-2 left-1 w-1 h-1 bg-yellow-300 rounded"></div>
              <div className="absolute top-2 right-1 w-1 h-1 bg-yellow-300 rounded"></div>
              
              {/* Wind turbine on top */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2"
              >
                <div className="w-1 h-3 bg-white"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-white origin-center rotate-0"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-white origin-center rotate-120"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-white origin-center rotate-240"></div>
              </motion.div>
            </motion.div>
          </div>

          <div className="text-center">
            <Building className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-blue-700">Smart Infrastructure</p>
          </div>
        </motion.div>

        {/* Business People */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="flex flex-col items-center space-y-6"
        >
          {/* Handshake Scene */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative"
          >
            <div className="flex items-center space-x-2">
              {/* Indian Investor */}
              <div className="w-12 h-16 bg-gradient-to-b from-orange-400 to-orange-500 rounded-t-full relative">
                <div className="w-6 h-6 bg-yellow-200 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                <div className="w-8 h-6 bg-white rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
              </div>

              {/* Handshake */}
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="w-8 h-4 bg-yellow-300 rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-blue-200 rounded-full"></div>
              </motion.div>

              {/* Global Investor */}
              <div className="w-12 h-16 bg-gradient-to-b from-blue-400 to-blue-500 rounded-t-full relative">
                <div className="w-6 h-6 bg-yellow-200 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                <div className="w-8 h-6 bg-gray-100 rounded-lg absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
            </div>
          </motion.div>

          {/* Document Signing */}
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
            className="relative"
          >
            <div className="w-16 h-10 bg-white rounded-lg shadow-lg border-2 border-gray-200 relative">
              <div className="absolute top-2 left-2 w-12 h-1 bg-gray-300 rounded"></div>
              <div className="absolute top-4 left-2 w-8 h-1 bg-gray-300 rounded"></div>
              <div className="absolute bottom-1 right-1 w-4 h-2 bg-blue-500 rounded text-xs text-white flex items-center justify-center">
                ✓
              </div>
            </div>
          </motion.div>

          <div className="text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-green-700">Global Partnership</p>
          </div>
        </motion.div>

        {/* Kakatiya Heritage & Progress */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="flex flex-col items-center space-y-4"
        >
          {/* Kakatiya Arch (simplified) */}
          <motion.div
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-20 h-16 relative">
              {/* Arch structure */}
              <div className="absolute bottom-0 left-0 w-4 h-12 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg"></div>
              <div className="absolute bottom-0 right-0 w-4 h-12 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-lg"></div>
              <div className="absolute top-2 left-2 w-16 h-6 bg-yellow-500 rounded-full"></div>
              
              {/* Decorative elements */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></div>
              <div className="absolute top-4 left-6 w-1 h-1 bg-orange-600 rounded-full"></div>
              <div className="absolute top-4 right-6 w-1 h-1 bg-orange-600 rounded-full"></div>
            </div>
          </motion.div>

          {/* Progress Data Visualization */}
          <motion.div
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            className="flex space-x-1"
          >
            <div className="w-2 h-8 bg-green-500 rounded"></div>
            <div className="w-2 h-12 bg-blue-500 rounded"></div>
            <div className="w-2 h-6 bg-orange-500 rounded"></div>
            <div className="w-2 h-10 bg-purple-500 rounded"></div>
          </motion.div>

          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-orange-700">Heritage & Progress</p>
          </div>
        </motion.div>
      </div>

      {/* Animated Progress Bar */}
      <motion.div
        animate={{
          scaleX: [0.5, 1, 0.5],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-40 h-1 bg-gradient-to-r from-blue-500 via-green-500 via-orange-500 to-purple-500 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default InvestorsIllustration;
