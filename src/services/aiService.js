// Контекст для AI
const AI_CONTEXT = `You are an AI dating coach that helps users improve their dating conversations. 
Your responses should be:
1. Friendly and encouraging
2. Specific and actionable
3. Focused on building genuine connections
4. Respectful and ethical
5. Tailored to the user's situation`;

// Расширенные шаблоны ответов
const RESPONSE_TEMPLATES = {
  greetings: [
    "Hi! I'm here to help you improve your dating conversations!",
    "Hello! Let's work on making your dating game stronger!",
    "Hey there! Ready to master the art of conversation?",
  ],
  interests: [
    "That's fascinating! What got you interested in {topic}?",
    "I'd love to hear more about your experience with {topic}!",
    "That's interesting! How long have you been into {topic}?",
  ],
  stories: [
    "That's a great story! It shows {quality}. What happened next?",
    "Wow, that's quite an experience! How did you feel about it?",
    "That's impressive! What did you learn from that experience?",
  ],
  emotions: [
    "I understand feeling {emotion}. What helps you deal with that?",
    "It's completely normal to feel {emotion}. Would you like to talk about it?",
    "I hear you on feeling {emotion}. What would make you feel better?",
  ],
  suggestions: [
    "Try asking about their interests or hobbies!",
    "Share a funny story about yourself to break the ice.",
    "Ask about their favorite places to visit.",
    "Compliment something specific about their profile.",
    "Ask about their day and show genuine interest.",
  ],
  followUp: [
    "That's interesting! Tell me more about that.",
    "I can see why that would be important to you.",
    "That's a great point! What made you feel that way?",
  ],
};

// Расширенные паттерны для анализа
const CONVERSATION_PATTERNS = [
  {
    pattern: /^(hi|hello|hey)/i,
    responses: RESPONSE_TEMPLATES.greetings,
    type: 'greeting'
  },
  {
    pattern: /(music|movies|books|travel|food|sports|art|gaming|fitness|photography)/i,
    responses: RESPONSE_TEMPLATES.interests,
    type: 'interest',
    extractTopic: (message) => {
      const match = message.match(/(music|movies|books|travel|food|sports|art|gaming|fitness|photography)/i);
      return match ? match[1] : null;
    }
  },
  {
    pattern: /(story|experience|happened|once|when)/i,
    responses: RESPONSE_TEMPLATES.stories,
    type: 'story',
    extractQuality: (message) => {
      if (message.match(/brave|courage/i)) return 'bravery';
      if (message.match(/creative|innovative/i)) return 'creativity';
      if (message.match(/kind|helpful/i)) return 'kindness';
      return 'interesting personality';
    }
  },
  {
    pattern: /(feel|felt|feeling|emotion|happy|sad|angry|excited|nervous|anxious|confident|shy)/i,
    responses: RESPONSE_TEMPLATES.emotions,
    type: 'emotion',
    extractEmotion: (message) => {
      const emotions = ['happy', 'sad', 'angry', 'excited', 'nervous', 'anxious', 'confident', 'shy'];
      const match = message.match(new RegExp(emotions.join('|'), 'i'));
      return match ? match[0] : null;
    }
  },
  {
    pattern: /^(what|how|why|where|when|who)/i,
    responses: RESPONSE_TEMPLATES.followUp,
    type: 'question'
  },
  {
    pattern: /(interesting|cool|nice|great|awesome)/i,
    responses: ["Tell me more about that!", "What makes you say that?"],
    type: 'positive_response'
  },
  {
    pattern: /(boring|tired|exhausted|busy)/i,
    responses: ["I understand. Let's try to keep things light and fun!", "Maybe we can find something more engaging to talk about?"],
    type: 'negative_response'
  }
];

// Расширенный анализ настроения
const analyzeSentiment = (message) => {
  const positiveWords = [
    'great', 'awesome', 'wonderful', 'amazing', 'love', 'happy', 'excited',
    'fantastic', 'brilliant', 'perfect', 'excellent', 'joy', 'delight',
    'thrilled', 'grateful', 'blessed', 'lucky', 'fortunate'
  ];
  const negativeWords = [
    'bad', 'terrible', 'awful', 'hate', 'sad', 'angry', 'upset',
    'horrible', 'miserable', 'depressed', 'anxious', 'worried',
    'frustrated', 'annoyed', 'disappointed', 'hurt', 'lonely'
  ];
  
  const words = message.toLowerCase().split(' ');
  let sentiment = 'neutral';
  let intensity = 1;
  
  for (const word of words) {
    if (positiveWords.includes(word)) {
      sentiment = 'positive';
      intensity = Math.max(intensity, positiveWords.indexOf(word) > 5 ? 2 : 1);
      break;
    }
    if (negativeWords.includes(word)) {
      sentiment = 'negative';
      intensity = Math.max(intensity, negativeWords.indexOf(word) > 5 ? 2 : 1);
      break;
    }
  }
  
  return { sentiment, intensity };
};

// Улучшенная генерация контекстного ответа
const generateContextualResponse = (message, conversationHistory) => {
  // Анализ настроения
  const { sentiment, intensity } = analyzeSentiment(message);
  
  // Поиск подходящего паттерна
  const matchingPattern = CONVERSATION_PATTERNS.find(({ pattern }) =>
    pattern.test(message)
  );

  let response;
  
  if (matchingPattern) {
    let responseText = matchingPattern.responses[
      Math.floor(Math.random() * matchingPattern.responses.length)
    ];

    // Заполнение шаблона данными из сообщения
    if (matchingPattern.extractTopic) {
      const topic = matchingPattern.extractTopic(message);
      if (topic) {
        responseText = responseText.replace('{topic}', topic);
      }
    }
    if (matchingPattern.extractQuality) {
      const quality = matchingPattern.extractQuality(message);
      responseText = responseText.replace('{quality}', quality);
    }
    if (matchingPattern.extractEmotion) {
      const emotion = matchingPattern.extractEmotion(message);
      if (emotion) {
        responseText = responseText.replace('{emotion}', emotion);
      }
    }

    response = {
      text: responseText,
      type: matchingPattern.type,
      sentiment,
      intensity
    };
  } else {
    // Если нет совпадений, генерируем контекстный ответ на основе истории
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    if (lastMessage && lastMessage.type === 'question') {
      response = {
        text: "That's an interesting question! Let me help you formulate a response that shows genuine interest.",
        type: 'follow_up',
        sentiment,
        intensity
      };
    } else {
      response = {
        text: RESPONSE_TEMPLATES.suggestions[
          Math.floor(Math.random() * RESPONSE_TEMPLATES.suggestions.length)
        ],
        type: 'suggestion',
        sentiment,
        intensity
      };
    }
  }

  return response;
};

// Улучшенная генерация подсказки
const generateSuggestion = (conversationHistory) => {
  if (!conversationHistory || conversationHistory.length === 0) {
    return {
      text: "Start with a friendly greeting and ask about their day!",
      type: 'opener'
    };
  }

  const lastMessage = conversationHistory[conversationHistory.length - 1];
  const { sentiment, intensity } = analyzeSentiment(lastMessage.text);

  if (sentiment === 'negative') {
    return {
      text: intensity === 2 
        ? "Let's try to shift the conversation to a more positive topic. Ask about something they're passionate about!"
        : "Try to lighten the mood with a positive question or a fun topic!",
      type: 'mood_lifter'
    };
  }

  // Анализ последних сообщений для контекстной подсказки
  const lastTwoMessages = conversationHistory.slice(-2);
  if (lastTwoMessages.length === 2) {
    const [prevMessage, currentMessage] = lastTwoMessages;
    if (prevMessage.type === 'question' && currentMessage.type === 'answer') {
      return {
        text: "Great! Now try asking a follow-up question to show you're really interested in their response.",
        type: 'follow_up'
      };
    }
  }

  return {
    text: RESPONSE_TEMPLATES.suggestions[
      Math.floor(Math.random() * RESPONSE_TEMPLATES.suggestions.length)
    ],
    type: 'suggestion'
  };
};

export const aiService = {
  generateResponse: generateContextualResponse,
  generateSuggestion,
  analyzeSentiment
}; 