// Simple response templates for MVP
const RESPONSE_TEMPLATES = {
    greetings: [
      "Hi! I'm here to help you improve your dating conversations!",
      "Hello! Let's work on making your dating game stronger!",
      "Hey there! Ready to master the art of conversation?",
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
  
  // Simple conversation flow patterns
  const CONVERSATION_PATTERNS = [
    {
      pattern: /^(hi|hello|hey)/i,
      responses: RESPONSE_TEMPLATES.greetings,
    },
    {
      pattern: /^(what|how|why|where|when|who)/i,
      responses: RESPONSE_TEMPLATES.followUp,
    },
  ];
  
  export const generateResponse = (userMessage) => {
    // Find matching pattern
    const matchingPattern = CONVERSATION_PATTERNS.find(({ pattern }) =>
      pattern.test(userMessage)
    );
  
    if (matchingPattern) {
      const responses = matchingPattern.responses;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  
    // Default response if no pattern matches
    return RESPONSE_TEMPLATES.suggestions[
      Math.floor(Math.random() * RESPONSE_TEMPLATES.suggestions.length)
    ];
  };
  
  export const generateSuggestion = () => {
    return RESPONSE_TEMPLATES.suggestions[
      Math.floor(Math.random() * RESPONSE_TEMPLATES.suggestions.length)
    ];
  };
  
  // TODO: Implement more sophisticated AI logic
  // - Add sentiment analysis
  // - Implement conversation context tracking
  // - Add personality-based response generation
  // - Integrate with external AI services 