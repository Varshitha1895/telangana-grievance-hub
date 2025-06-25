
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Phone, Mail, Eye, EyeOff, User, Globe } from 'lucide-react';
import SignupForm from './SignupForm';
import LanguageSelector from './LanguageSelector';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'phone' | 'email' | 'signup'>('phone');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();
  const { login, signup } = useAuth();

  const handlePhoneLogin = async () => {
    if (phoneNumber.length !== 10) {
      setErrors({ phone: t('Please enter a valid 10-digit mobile number') });
      return;
    }
    
    if (!name.trim()) {
      setErrors({ name: t('Full name is required') });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    try {
      // Create demo account with phone number (no OTP required)
      const demoEmail = `${phoneNumber}@phone.demo`;
      const demoPassword = 'demo123456';
      
      const { error } = await signup(demoEmail, demoPassword, {
        full_name: name,
        phone_number: phoneNumber
      });
      
      if (error) {
        // If user already exists, try to login
        const { error: loginError } = await login(demoEmail, demoPassword);
        if (loginError) {
          setErrors({ general: t('Login failed. Please try again.') });
          setIsLoading(false);
          return;
        }
      }
      
      setTimeout(() => {
        onAuthenticated();
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setErrors({ general: t('Login failed. Please try again.') });
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      setErrors({ general: t('Please fill in all fields') });
      return;
    }

    setIsLoading(true);
    setErrors({});
    
    const { error } = await login(email, password);
    
    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setErrors({ general: t('Invalid email or password') });
      } else {
        setErrors({ general: error.message });
      }
    } else {
      onAuthenticated();
    }
    
    setIsLoading(false);
  };

  if (authMode === 'signup') {
    return (
      <SignupForm 
        onBack={() => setAuthMode('phone')} 
        onSuccess={onAuthenticated}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      }}
    >
      {/* Enhanced Animated Background Images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Government Building */}
        <motion.div
          animate={{ 
            x: [0, 150, 0], 
            y: [0, -80, 0],
            rotate: [0, 15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-16 left-16 w-40 h-40 rounded-2xl opacity-20 shadow-2xl"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551838147-6ac1cbc10fca?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Floating Technology Elements */}
        <motion.div
          animate={{ 
            x: [0, -120, 0], 
            y: [0, 100, 0],
            rotate: [0, -20, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-24 w-32 h-32 rounded-full opacity-25 shadow-xl"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0.5px)'
          }}
        />
        
        {/* Laptop/Digital Services */}
        <motion.div
          animate={{ 
            x: [0, 80, 0], 
            y: [0, -60, 0],
            scale: [1, 1.3, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-1/4 w-28 h-28 rounded-xl opacity-30 shadow-lg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(0.8px)'
          }}
        />
        
        {/* Service Representative */}
        <motion.div
          animate={{ 
            x: [0, -60, 0], 
            y: [0, 120, 0],
            rotate: [0, 25, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-1/3 w-36 h-36 rounded-2xl opacity-25 shadow-xl"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          animate={{ 
            x: [0, 200, 0], 
            y: [0, -100, 0],
            rotate: [0, -30, 0],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-8 w-24 h-24 rounded-full opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1.5px)'
          }}
        />
        
        {/* Geometric overlay patterns */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-8 w-20 h-20 rounded-full bg-gradient-to-r from-white/20 to-yellow-300/30 blur-sm"
        />
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            x: [0, -150, 0],
            y: [0, 80, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 45, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-12 w-16 h-16 rounded-full bg-gradient-to-r from-blue-300/40 to-purple-300/40 blur-lg"
        />
      </div>

      {/* Enhanced backdrop blur overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Enhanced logo animation */}
        <div className="text-center mb-8">
          <motion.div 
            animate={{ 
              rotate: [0, 8, -8, 0],
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 30px rgba(255,255,255,0.3)',
                '0 0 50px rgba(255,255,255,0.6)',
                '0 0 30px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
          >
            <motion.span 
              className="text-3xl"
              animate={{ 
                rotate: [0, 15, -15, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              🏛️
            </motion.span>
          </motion.div>
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold text-white mb-2 tracking-wide"
            style={{ 
              textShadow: '0 4px 12px rgba(0,0,0,0.5)',
              background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Mee Saaradhi
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-lg font-medium"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
          >
            {t('Secure Login to Continue')}
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md hover:bg-white/98 transition-all duration-300">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-800">
                {authMode === 'phone' 
                  ? t('Login with Mobile')
                  : t('Login with Email')
                }
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {errors.general && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                >
                  {errors.general}
                </motion.div>
              )}

              {/* Phone Login Flow */}
              {authMode === 'phone' && (
                <>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t('Enter your full name')}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                      }}
                      className="pl-10 h-12 text-lg border-2 focus:border-orange-400 transition-all duration-300"
                    />
                  </motion.div>
                  {errors.name && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.name}
                    </motion.p>
                  )}

                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      placeholder={t('Enter 10-digit mobile number')}
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                      }}
                      className="pl-10 h-12 text-lg border-2 focus:border-orange-400 transition-all duration-300"
                      maxLength={10}
                    />
                  </motion.div>
                  {errors.phone && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm"
                    >
                      {errors.phone}
                    </motion.p>
                  )}
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handlePhoneLogin}
                      disabled={isLoading || phoneNumber.length !== 10 || !name.trim()}
                      className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        t('Login')
                      )}
                    </Button>
                  </motion.div>
                </>
              )}

              {/* Email Login Flow */}
              {authMode === 'email' && (
                <>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      placeholder={t('Email Address')}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.general) setErrors({});
                      }}
                      className="pl-10 h-12 border-2 focus:border-blue-400 transition-all duration-300"
                    />
                  </motion.div>
                  <motion.div 
                    className="relative"
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t('Password')}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.general) setErrors({});
                      }}
                      className="pr-10 h-12 border-2 focus:border-blue-400 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleEmailLogin}
                      disabled={isLoading || !email || !password}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        t('Sign In')
                      )}
                    </Button>
                  </motion.div>
                </>
              )}
              
              {/* Auth Mode Toggle */}
              <div className="flex gap-2">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={authMode === 'phone' ? 'default' : 'outline'}
                    onClick={() => {
                      setAuthMode('phone');
                      setErrors({});
                    }}
                    className="w-full text-sm transition-all duration-300"
                  >
                    {t('Phone')}
                  </Button>
                </motion.div>
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={authMode === 'email' ? 'default' : 'outline'}
                    onClick={() => {
                      setAuthMode('email');
                      setErrors({});
                    }}
                    className="w-full text-sm transition-all duration-300"
                  >
                    {t('Email')}  
                  </Button>
                </motion.div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center pt-2">
                <p className="text-gray-600 text-sm">
                  {t("Don't have an account?")}{' '}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAuthMode('signup')}
                    className="text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300"
                  >
                    {t('Sign Up')}
                  </motion.button>
                </p>
              </div>
              
              {/* Enhanced Language Selector */}
              <motion.div 
                className="pt-4 space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>{t('Select Language')}</span>
                </div>
                <LanguageSelector />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AuthScreen;
