import { createChatBotMessage } from 'react-chatbot-kit';
import { Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import TextToSpeech from './TextToSpeech';

const botName = 'Benchi';

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi I'm ${botName}! Are you interested in finding the right investment strategy for you together?`)],
  state: {
    questionNr: 0,
    userPreferences: {experience: '', risk: '', active: false, effort: '', duration: ''},
  },
  customComponents: {
     // Replaces the default header
    header: () => <div style={{ backgroundColor: '#493f35', padding: '5px', borderRadius: '3px' , color: 'white'}}>Talk to Benchi!</div>,
    // Replaces the default bot avatar
    botAvatar: (props) => 
      <Box sx={{marginRight: '12.5px'}}>
        <Avatar
          className='me-xs-2 me-md-0'
          alt={`Benchi-avatar`}
          src={`${process.env.PUBLIC_URL}/assets/images/chatbot.png`}
          sx={{
            backgroundColor: 'white',
            border: '2px solid #eacfb4'
          }}
        />
      </Box>,
    userAvatar: (props) => 
    <Box sx={{marginLeft: '12.5px'}}>
    <Avatar
      className='me-xs-2 me-md-0'
      alt={`Benchi-avatar`}
      sx={{
        backgroundColor: 'white',
        border: '2px solid #eacfb4'
      }}
    >
      <PersonIcon sx={{zIndex: '500', color: '#eacfb4'}}></PersonIcon>
    </Avatar>
  </Box>,
  },
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