import { createChatBotMessage } from 'react-chatbot-kit';

const botName = 'Benchi';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}! Are you interested in finding the right investment strategy for you together?`)],
  customComponents: {
     // Replaces the default header
    header: () => <div style={{ backgroundColor: '#493f35', padding: '5px', borderRadius: '3px' , color: 'white'}}>Talk to Benchi!</div>
  },
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#493f35',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;