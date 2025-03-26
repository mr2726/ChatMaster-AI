# AI Dating Coach Chat App

An intelligent chat application powered by Ollama AI that helps users improve their dating conversations and communication skills.

## 🌟 Features

- **AI-Powered Conversations**: Uses Ollama's Mistral model to provide intelligent, context-aware responses
- **Smart Suggestions**: Get real-time suggestions for keeping conversations engaging
- **Chat History**: Maintains conversation history for context-aware responses
- **Modern UI**: Clean and intuitive interface with smooth animations
- **Real-time Feedback**: Immediate AI responses with loading indicators
- **Offline Capable**: Uses local AI model through Ollama

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- [Ollama](https://ollama.ai/) installed on your system

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-dating-coach.git
cd ai-dating-coach
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install and start Ollama:
- Download Ollama from [ollama.ai](https://ollama.ai)
- Install the Mistral model:
```bash
ollama pull mistral
```

4. Start the application:
```bash
npm start
# or
yarn start
```

## 💡 Usage

1. **Start a New Chat**:
   - Click the "Start New Chat" button on the home screen
   - Begin typing your message in the input field

2. **Get AI Suggestions**:
   - Click the lightbulb icon to get contextual suggestions
   - AI will analyze the conversation and provide relevant advice

3. **View Chat History**:
   - All conversations are saved automatically
   - Access previous chats from the main screen

## 🛠 Technical Stack

- **Frontend**: React Native
- **AI Model**: Ollama (Mistral)
- **State Management**: React Context
- **UI Components**: Custom components with React Native core components
- **Styling**: React Native StyleSheet

## 🤖 AI Features

The AI coach is designed to:
- Provide natural and conversational responses
- Give friendly and encouraging feedback
- Offer specific and actionable advice
- Focus on building genuine connections
- Maintain respectful and ethical communication
- Keep responses brief and to the point

## 📝 Configuration

You can customize the AI behavior by modifying the `src/services/ollamaService.js` file:

- Change the AI model (default is Mistral)
- Adjust the system prompt
- Modify response parameters
- Configure conversation history length

## 🔒 Privacy

All conversations are processed locally through Ollama. No data is sent to external servers, ensuring complete privacy of your conversations.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai/) for providing the local AI model
- [React Native](https://reactnative.dev/) for the mobile development framework
- [Mistral AI](https://mistral.ai/) for the language model

## 📞 Support

If you have any questions or run into issues, please open an issue in the GitHub repository. 
