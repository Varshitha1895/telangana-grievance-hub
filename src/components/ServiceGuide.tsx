
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, HelpCircle, FileText, Clock, CheckCircle } from 'lucide-react';

interface ServiceGuideProps {
  onBack: () => void;
}

const ServiceGuide: React.FC<ServiceGuideProps> = ({ onBack }) => {
  const { t } = useLanguage();

  const complaintCategories = [
    {
      name: t('Pensions'),
      description: t('Issues related to pension schemes and benefits'),
      steps: [
        t('Select Pension category'),
        t('Provide Aadhaar number and pension type'),
        t('Describe the specific issue'),
        t('Submit with supporting documents')
      ]
    },
    {
      name: t('Roads & Infrastructure'),
      description: t('Road damages, potholes, and infrastructure issues'),
      steps: [
        t('Select Roads & Infrastructure category'),
        t('Provide road name and location'),
        t('Specify type of damage'),
        t('Add photos and submit')
      ]
    },
    {
      name: t('Health Services'),
      description: t('Hospital and healthcare related complaints'),
      steps: [
        t('Select Health Services category'),
        t('Provide hospital/clinic details'),
        t('Set urgency level'),
        t('Describe the healthcare issue')
      ]
    }
  ];

  const faqs = [
    {
      question: t('How do I file a complaint?'),
      answer: t('Click on "File New Complaint" from the dashboard, select your category, fill in the details, and submit. You will receive a complaint ID for tracking.')
    },
    {
      question: t('How can I track my complaint status?'),
      answer: t('Use the "Track Complaints" option from the dashboard. Enter your complaint ID or search by description to see the current status.')
    },
    {
      question: t('What documents do I need?'),
      answer: t('Depending on the complaint type, you may need Aadhaar card, relevant certificates, photos of the issue, or other supporting documents.')
    },
    {
      question: t('How long does it take to resolve complaints?'),
      answer: t('Resolution time varies by category: Emergency issues within 24 hours, general complaints within 7-15 days, and complex issues within 30 days.')
    },
    {
      question: t('Can I file complaints in Telugu?'),
      answer: t('Yes, Mee Saaradhi supports both Telugu and English. Use the language toggle button to switch between languages.')
    },
    {
      question: t('What if I don\'t have internet access?'),
      answer: t('You can call our helpline at 1800-425-0425 for assistance or visit the nearest government office.')
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            y: [-15, 15, -15],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-40 left-20 w-32 h-32 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-full opacity-20 blur-xl"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Enhanced Header */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center mb-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/30"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4"
          >
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-3 rounded-xl hover:bg-blue-100"
            >
              <ArrowLeft className="h-6 w-6 text-blue-600" />
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex items-center space-x-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {t('Service Guide')}
              </h1>
              <p className="text-gray-600 mt-1 text-lg">{t('Complete guide to using Mee Saaradhi')}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced How to File Complaint */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <CardTitle className="flex items-center text-xl">
                <FileText className="mr-3 h-6 w-6" />
                {t('How to File a Complaint')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { 
                    number: "1", 
                    title: t('Select Category'), 
                    desc: t('Choose the appropriate complaint category'),
                    gradient: "from-blue-500 to-purple-500",
                    icon: "🏷️"
                  },
                  { 
                    number: "2", 
                    title: t('Provide Details'), 
                    desc: t('Fill in all required information and upload media'),
                    gradient: "from-green-500 to-teal-500",
                    icon: "📝"
                  },
                  { 
                    number: "3", 
                    title: t('Submit & Track'), 
                    desc: t('Submit your complaint and track its progress'),
                    gradient: "from-orange-500 to-red-500",
                    icon: "📊"
                  }
                ].map((step, index) => (
                  <motion.div 
                    key={step.number}
                    className="text-center"
                    whileHover={{ scale: 1.05, y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <motion.div 
                      className={`w-20 h-20 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      animate={{ 
                        boxShadow: [
                          "0 4px 20px rgba(0,0,0,0.1)",
                          "0 8px 30px rgba(0,0,0,0.2)",
                          "0 4px 20px rgba(0,0,0,0.1)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    >
                      <span className="text-2xl">{step.icon}</span>
                    </motion.div>
                    <h3 className="font-bold mb-3 text-lg">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Complaint Categories Guide */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle>{t('Complaint Categories')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {complaintCategories.map((category, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="space-y-2">
                    {category.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              {t('Frequently Asked Questions')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default ServiceGuide;
