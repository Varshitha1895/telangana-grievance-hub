
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t('Service Guide')}</h1>
            <p className="text-gray-600">{t('Complete guide to using Mee Saaradhi')}</p>
          </div>
        </div>

        {/* How to File Complaint */}
        <Card className="mb-6 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              {t('How to File a Complaint')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="font-semibold mb-2">{t('Select Category')}</h3>
                <p className="text-sm text-gray-600">{t('Choose the appropriate complaint category')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="font-semibold mb-2">{t('Provide Details')}</h3>
                <p className="text-sm text-gray-600">{t('Fill in all required information and upload media')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="font-semibold mb-2">{t('Submit & Track')}</h3>
                <p className="text-sm text-gray-600">{t('Submit your complaint and track its progress')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
