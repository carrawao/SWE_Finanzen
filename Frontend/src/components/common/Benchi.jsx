import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Modal,
  Container,
  Typography,
  Avatar,
  IconButton,
  Grid,
  Paper
} from '@mui/material';

import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../../benchi/config.js';
import MessageParser from '../../benchi/MessageParser.js';
import ActionProvider from '../../benchi/ActionProvider.js';

/**
 * Template to show modals throughout the app
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
 const Benchi = props => {
  const [showBot, toggleBot] = useState(false);
  
  const saveMessages = (messages, HTMLString) => {
    console.log(messages)
    localStorage.setItem('chatMessages', JSON.stringify(HTMLString));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chatMessages'));
    return messages;
  };  
  
  return (
    <React.Fragment>
      <Grid container direction='column' alignItems='flex-end'>
        <Grid item>
          {showBot && (
            <Paper elevation={6}>
              <Chatbot
                config={config}
                actionProvider={ActionProvider}
                messageHistory={loadMessages()}
                messageParser={MessageParser}
                saveMessages={saveMessages}
              />
            </Paper>
          )}
        </Grid>
        <Grid item>
          <IconButton
            aria-label='Open Benchi Chat'
            size='small'
            onClick={() => toggleBot((prev) => !prev)}
            sx={{
              
            }}
          >
            <Avatar
              className='me-xs-2 me-md-0'
              alt={`Benchi-icon`}
              src={`${process.env.PUBLIC_URL}/assets/images/chatbot.png`}
              sx={{
                backgroundColor: 'white',
                border: '1px solid #493f35',
                width: {
                  xs: '4rem',
                  md: '5rem'
                },
                height: {
                  xs: '4rem',
                  md: '5rem'
                },
              }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
 }

export default Benchi;