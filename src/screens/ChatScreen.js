import React, { useRef, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import ChatBubble from '../components/ChatBubble';
import ChatInput from '../components/ChatInput';
import { useChat } from '../context/ChatContext';
import { ollamaService } from '../services/ollamaService';

const ChatScreen = ({ route, navigation }) => {
  const { chatId, chatName } = route.params;
  const { getChatMessages, addMessage } = useChat();
  const messages = getChatMessages(chatId);
  const flatListRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = async (messageText) => {
    // Добавляем сообщение пользователя
    const userMessage = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      type: 'user_message'
    };
    addMessage(chatId, userMessage);

    // Получаем последние 5 сообщений для контекста
    const conversationHistory = [...messages, userMessage].slice(-5);
    
    setIsLoading(true);
    try {
      // Генерируем ответ AI с учетом контекста
      const aiResponse = await ollamaService.generateResponse(messageText, conversationHistory);
      
      // Добавляем ответ AI
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        type: aiResponse.type,
        sentiment: aiResponse.sentiment
      };
      
      addMessage(chatId, aiMessage);
    } catch (error) {
      console.error('Error generating AI response:', error);
      // Добавляем сообщение об ошибке
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
        type: 'error',
        sentiment: 'neutral'
      };
      addMessage(chatId, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggest = async () => {
    setIsLoading(true);
    try {
      const suggestion = await ollamaService.generateSuggestion(messages);
      
      const suggestionMessage = {
        id: Date.now().toString(),
        text: suggestion.text,
        isUser: false,
        timestamp: new Date(),
        type: suggestion.type
      };
      
      addMessage(chatId, suggestionMessage);
    } catch (error) {
      console.error('Error generating suggestion:', error);
      const errorMessage = {
        id: Date.now().toString(),
        text: "I'm having trouble thinking of a suggestion right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
        type: 'error'
      };
      addMessage(chatId, errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <ChatBubble 
            message={item.text} 
            isUser={item.isUser}
            type={item.type}
            sentiment={item.sentiment}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
      <ChatInput onSend={handleSend} onSuggest={handleSuggest} disabled={isLoading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesList: {
    padding: 15,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
});

export default ChatScreen; 