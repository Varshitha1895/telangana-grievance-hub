
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Phone, Mail, Eye, EyeOff, User, Globe, Sparkles } from 'lucide-react';
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
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'phone' | 'email' | 'signup'>('phone');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLanguage();
  const { login, signup } = useAuth();

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setErrors({ phone: t('Please enter a valid 10-digit mobile number') });
      return;
    }
    
    if (!name.trim()) {
      setErrors({ name: t('Full name is required') });
      return;
    }

    setErrors({});
    setShowOtpInput(true);
  };

  const handlePhoneLogin = async () => {
    if (otp !== '123456') {
      setErrors({ otp: t('Invalid OTP. Please enter 123456') });
      return;
    }
    
    setIsLoading(true);
    setErrors({});
    
    // Direct redirect without any signup/login process for demo
    setTimeout(() => {
      onAuthenticated();
      setIsLoading(false);
    }, 1000);
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Beautiful Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{ 
            x: [0, 100, 0], 
            y: [0, -50, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-16 w-20 h-20 bg-gradient-to-r from-pink-400/30 to-purple-400/30 rounded-full backdrop-blur-sm"
        />
        
        <motion.div
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 60, 0],
            rotate: [0, -90, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-lg backdrop-blur-sm"
        />
        
        <motion.div
          animate={{ 
            x: [0, 60, 0], 
            y: [0, -80, 0],
            rotate: [0, 45, 0],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-32 left-1/4 w-12 h-12 bg-gradient-to-r from-green-400/30 to-blue-400/30 rounded-full backdrop-blur-sm"
        />
        
        <motion.div
          animate={{ 
            x: [0, -100, 0], 
            y: [0, 70, 0],
            rotate: [0, -180, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-lg backdrop-blur-sm"
        />

        {/* Sparkle Effects */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3"
        >
          <Sparkles className="w-6 h-6 text-white/50" />
        </motion.div>
        
        <motion.div
          animate={{ 
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-3/4 right-1/4"
        >
          <Sparkles className="w-4 h-4 text-white/40" />
        </motion.div>
      </div>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
      
      <div className="relative w-full max-w-md z-10">
        {/* Enhanced logo with light theme */}
        <div className="text-center mb-8">
          <motion.div 
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1],
              boxShadow: [
                '0 0 20px rgba(255,255,255,0.3)',
                '0 0 40px rgba(255,255,255,0.5)',
                '0 0 20px rgba(255,255,255,0.3)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20"
          >
            <motion.span 
              className="text-3xl"
              animate={{ 
                rotate: [0, 10, -10, 0],
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
              textShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            Mee Saaradhi
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/90 text-lg font-medium"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.2)' }}
          >
            {t('Secure Login to Continue')}
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        >
          <Card className="shadow-2xl border-0 bg-white/98 backdrop-blur-lg hover:bg-white transition-all duration-300 border border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-gray-800 flex items-center justify-center gap-2">
                <User className="w-5 h-5 text-purple-500" />
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
                  {!showOtpInput ? (
                    <>
                      <motion.div 
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <User className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                        <Input
                          type="text"
                          placeholder={t('Enter your full name')}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                          }}
                          className="pl-10 h-12 text-lg border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 bg-white/80"
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
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                        <Input
                          type="tel"
                          placeholder={t('Enter 10-digit mobile number')}
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                          }}
                          className="pl-10 h-12 text-lg border-2 border-purple-200 focus:border-purple-400 transition-all duration-300 bg-white/80"
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
                          onClick={handleSendOtp}
                          disabled={phoneNumber.length !== 10 || !name.trim()}
                          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          {t('Send OTP')}
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-4"
                      >
                        <p className="text-gray-600">
                          {t('Enter the OTP sent to')} +91 {phoneNumber}
                        </p>
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                          <p className="text-purple-700 text-sm font-medium">
                            {t('Demo OTP')}: <span className="font-bold text-lg text-purple-800">123456</span>
                          </p>
                        </div>
                        
                        <div className="flex justify-center">
                          <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => {
                              setOtp(value);
                              if (errors.otp) setErrors(prev => ({ ...prev, otp: '' }));
                            }}
                          >
                            <InputOTPGroup>
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                        
                        {errors.otp && (
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-500 text-sm"
                          >
                            {errors.otp}
                          </motion.p>
                        )}
                        
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="space-y-3"
                        >
                          <Button 
                            onClick={handlePhoneLogin}
                            disabled={isLoading || otp.length !== 6}
                            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            {isLoading ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                            ) : (
                              t('Verify & Login')
                            )}
                          </Button>
                          
                          <Button 
                            variant="outline"
                            onClick={() => {
                              setShowOtpInput(false);
                              setOtp('');
                              setErrors({});
                            }}
                            className="w-full h-10 border-purple-200 text-purple-600 hover:bg-purple-50"
                          >
                            {t('Back')}
                          </Button>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
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
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                    <Input
                      type="email"
                      placeholder={t('Email Address')}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.general) setErrors({});
                      }}
                      className="pl-10 h-12 border-2 border-blue-200 focus:border-blue-400 transition-all duration-300 bg-white/80"
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
                      className="pr-10 h-12 border-2 border-blue-200 focus:border-blue-400 transition-all duration-300 bg-white/80"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-blue-400 hover:text-blue-600 transition-colors"
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
              {!showOtpInput && (
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
                      className={`w-full text-sm transition-all duration-300 ${
                        authMode === 'phone' 
                          ? 'bg-purple-500 hover:bg-purple-600 text-white' 
                          : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                      }`}
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
                      className={`w-full text-sm transition-all duration-300 ${
                        authMode === 'email' 
                          ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                          : 'border-blue-200 text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {t('Email')}  
                    </Button>
                  </motion.div>
                </div>
              )}

              {/* Sign Up Link */}
              {!showOtpInput && (
                <div className="text-center pt-2">
                  <p className="text-gray-600 text-sm">
                    {t("Don't have an account?")}{' '}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAuthMode('signup')}
                      className="text-purple-500 hover:text-purple-600 font-medium transition-colors duration-300"
                    >
                      {t('Sign Up')}
                    </motion.button>
                  </p>
                </div>
              )}
              
              {/* Language Selector */}
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
