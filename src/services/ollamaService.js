const OLLAMA_API_ENDPOINT = 'http://localhost:11434/api/generate';

const systemPrompt = `You are an AI dating coach helping users improve their dating conversations.
Your responses should be:
1. Natural and conversational
2. Friendly and encouraging
3. Specific and actionable
4. Focused on building genuine connections
5. Respectful and ethical
6. Brief (max 2-3 sentences)

Analyze the conversation context and provide appropriate responses that help users:
- Ask engaging questions
- Share interesting stories
- Show genuine interest
- Maintain good conversation flow
- Build rapport naturally`;

const generateAIResponse = async (message, conversationHistory) => {
    try {
        // Подготовка контекста из истории сообщений
        const context = conversationHistory
            .map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.text}`)
            .join('\n');

        const prompt = `${systemPrompt}\n\nConversation history:\n${context}\n\nUser: ${message}\nAssistant:`;

        const response = await fetch(OLLAMA_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistral', // или другую модель, которую вы предпочитаете
                prompt: prompt,
                stream: false
            })
        });

        const data = await response.json();

        if (!data.response) {
            console.error('Ollama API Error:', data);
            return {
                text: "I'm having trouble connecting right now. Let me think about that for a moment...",
                type: 'error',
                sentiment: 'neutral'
            };
        }

        return {
            text: data.response.trim(),
            type: 'ai_response',
            sentiment: 'neutral'
        };
    } catch (error) {
        console.error('Error calling Ollama:', error);
        return {
            text: "I'm having trouble connecting right now. Let me think about that for a moment...",
            type: 'error',
            sentiment: 'neutral'
        };
    }
};

const generateSuggestion = async (conversationHistory) => {
    try {
        const context = conversationHistory
            .map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.text}`)
            .join('\n');

        const suggestionPrompt = `${systemPrompt}\n\nConversation history:\n${context}\n\nBased on this conversation, suggest a good next message or question that would help keep the conversation engaging and natural. Be specific and brief.\n\nSuggestion:`;

        const response = await fetch(OLLAMA_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistral',
                prompt: suggestionPrompt,
                stream: false
            })
        });

        const data = await response.json();

        if (!data.response) {
            console.error('Ollama API Error:', data);
            return {
                text: "I'm having trouble thinking of a suggestion right now...",
                type: 'error'
            };
        }

        return {
            text: data.response.trim(),
            type: 'suggestion'
        };
    } catch (error) {
        console.error('Error generating suggestion:', error);
        return {
            text: "I'm having trouble thinking of a suggestion right now...",
            type: 'error'
        };
    }
};

export const ollamaService = {
    generateResponse: generateAIResponse,
    generateSuggestion
}; 