import { config } from '../config/config';

const OPENAI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

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
        // Подготовка истории сообщений для контекста
        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory.map(msg => ({
                role: msg.isUser ? 'user' : 'assistant',
                content: msg.text
            })),
            { role: 'user', content: message }
        ];

        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                temperature: 0.7,
                max_tokens: 150,
                presence_penalty: 0.6,
                frequency_penalty: 0.5
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('OpenAI API Error:', data.error);
            return {
                text: "I'm having trouble connecting right now. Let me think about that for a moment...",
                type: 'error',
                sentiment: 'neutral'
            };
        }

        return {
            text: data.choices[0].message.content,
            type: 'ai_response',
            sentiment: 'neutral' // Можно добавить анализ настроения ответа если нужно
        };
    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return {
            text: "I'm having trouble connecting right now. Let me think about that for a moment...",
            type: 'error',
            sentiment: 'neutral'
        };
    }
};

const generateSuggestion = async (conversationHistory) => {
    try {
        const suggestionPrompt = `Based on the conversation history, suggest a good next message or question that would help keep the conversation engaging and natural. Be specific and brief.`;

        const messages = [
            { role: 'system', content: systemPrompt },
            ...conversationHistory.map(msg => ({
                role: msg.isUser ? 'user' : 'assistant',
                content: msg.text
            })),
            { role: 'user', content: suggestionPrompt }
        ];

        const response = await fetch(OPENAI_API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: messages,
                temperature: 0.7,
                max_tokens: 100,
                presence_penalty: 0.6,
                frequency_penalty: 0.5
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('OpenAI API Error:', data.error);
            return {
                text: "I'm having trouble thinking of a suggestion right now...",
                type: 'error'
            };
        }

        return {
            text: data.choices[0].message.content,
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

export const openAiService = {
    generateResponse: generateAIResponse,
    generateSuggestion
}; 