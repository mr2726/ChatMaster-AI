import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ChatProvider, useChat } from './src/context/ChatContext';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { addChat } = useChat();

  const handleStartNewChat = (navigation) => {
    const chatId = Date.now().toString();
    const newChat = {
      id: chatId,
      name: 'New Chat',
      lastMessage: '',
      timestamp: new Date(),
      messages: [],
    };
    addChat(newChat);
    navigation.navigate('Chat', {
      chatId,
      chatName: 'New Chat'
    });
  };

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
          initialParams={{
            onStart: handleStartNewChat
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={({ route }) => ({
            title: route.params?.chatName || 'Chat',
          })}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'Settings',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatProvider>
        <AppContent />
      </ChatProvider>
    </SafeAreaProvider>
  );
}
