
interface AIResponse {
  reply: string;
  error?: string;
}

export const getAIResponse = async (message: string, language: string): Promise<AIResponse> => {
  try {
    // Simulate AI response based on common questions
    const responses = {
      en: {
        greeting: "Hello! I'm here to help you with any questions about our platform. How can I assist you today?",
        grievance: "To file a grievance, click on 'Submit Grievance' from the dashboard. Fill in all required details and submit your complaint.",
        track: "You can track your complaints by clicking 'Track Complaints' on the dashboard. You'll see the status of all your submitted grievances.",
        emergency: "For emergency support, click on 'Emergency Support' from the dashboard. You'll find contact numbers for immediate assistance.",
        account: "Your account information can be updated from the profile section. Make sure to keep your details current.",
        help: "I'm here to help! You can ask me about filing grievances, tracking complaints, emergency contacts, or any other platform features.",
        default: "I understand your question. Our support team is designed to help with platform navigation, grievance filing, complaint tracking, and general assistance. Could you please be more specific about what you need help with?"
      },
      te: {
        greeting: "హలో! మా ప్లాట్‌ఫారమ్ గురించి మీకు ఏవైనా ప్రశ్నలతో సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
        grievance: "ఫిర్యాదు దాఖలు చేయడానికి, డాష్‌బోర్డ్ నుండి 'ఫిర్యాదు సమర్పించు' మీద క్లిక్ చేయండి. అవసరమైన అన్ని వివరాలను పూరించి మీ ఫిర్యాదును సమర్పించండి.",
        track: "డాష్‌బోర్డ్‌లో 'ఫిర్యాదులను ట్రాక్ చేయండి' మీద క్లిక్ చేయడం ద్వారా మీరు మీ ఫిర్యాదులను ట్రాక్ చేయవచ్చు. మీరు సమర్పించిన అన్ని ఫిర్యాదుల స్థితిని చూడవచ్చు.",
        emergency: "అత్యవసర మద్దతు కోసం, డాష్‌బోర్డ్ నుండి 'అత్యవసర మద్దతు' మీద క్లిక్ చేయండి. తక్షణ సహాయం కోసం మీకు సంప్రదింపు నంబర్‌లు కనిపిస్తాయి.",
        account: "మీ ఖాతా సమాచారాన్ని ప్రొఫైల్ విభాగం నుండి అప్‌డేట్ చేయవచ్చు. మీ వివరాలను ప్రస్తుతంగా ఉంచడాన్ని నిర్ధారించుకోండి.",
        help: "నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను! మీరు ఫిర్యాదులు దాఖలు చేయడం, ఫిర్యాదులను ట్రాక్ చేయడం, అత్యవసర సంప్రదింపులు లేదా ఇతర ప్లాట్‌ఫారమ్ ఫీచర్‌ల గురించి నన్ను అడగవచ్చు.",
        default: "మీ ప్రశ్న నాకు అర్థమైంది. మా మద్దతు బృందం ప్లాట్‌ఫారమ్ నావిగేషన్, ఫిర్యాదు దాఖలు, ఫిర్యాదు ట్రాకింగ్ మరియు సాధారణ సహాయంతో సహాయం చేయడానికి రూపొందించబడింది. దయచేసి మీకు ఏమి సహాయం కావాలో మరింత స్పష్టంగా చెప్పగలరా?"
      }
    };

    const langResponses = responses[language] || responses.en;
    const lowerMessage = message.toLowerCase();

    // Simple keyword matching for demo
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('హలో')) {
      return { reply: langResponses.greeting };
    } else if (lowerMessage.includes('grievance') || lowerMessage.includes('complaint') || lowerMessage.includes('ఫిర్యాదు')) {
      return { reply: langResponses.grievance };
    } else if (lowerMessage.includes('track') || lowerMessage.includes('status') || lowerMessage.includes('ట్రాక్')) {
      return { reply: langResponses.track };
    } else if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('అత్యవసర')) {
      return { reply: langResponses.emergency };
    } else if (lowerMessage.includes('account') || lowerMessage.includes('profile') || lowerMessage.includes('ఖాతా')) {
      return { reply: langResponses.account };
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('సహాయం')) {
      return { reply: langResponses.help };
    } else {
      return { reply: langResponses.default };
    }
  } catch (error) {
    console.error('AI Service Error:', error);
    return { 
      reply: language === 'te' 
        ? "క్షమించండి, ప్రస్తుతానికి నేను మీ ప్రశ్నకు సరైన సమాధానం ఇవ్వలేకపోతున్నాను. దయచేసి మా మద్దతు బృందాన్ని సంప్రదించండి."
        : "I apologize, but I'm unable to provide a proper response to your question right now. Please contact our support team for assistance.",
      error: error.message 
    };
  }
};
