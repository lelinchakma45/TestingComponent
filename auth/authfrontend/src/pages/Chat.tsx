import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import axios from 'axios';

interface Message {
  id: number;
  sender: string;
  reciever: string;
  text: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState(null);
  const [inputText, setInputText] = useState('');
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get('http://localhost:8000/api/users/', {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          });
          console.log(response.data); // Set the user data to state
          setUser(response.data); // Set the user data to state
        } catch (error) {
          console.error('Error fetching user data:', error.response.data);
        }
      }
    };

    fetchUserData();
  }, [token]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'user1', // Replace this with the current user's identifier
        reciever : 'user2',
        text: inputText,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText('');
    }
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
      }}
    >
        <Box>
        </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '16px',
          borderBottom: '1px solid #ccc',
        }}
      >
        <Typography variant="h6" align="center">Chat</Typography>
        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemAvatar>
                <Avatar>{message.sender === 'user1' ? 'U1' : 'U2'}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={message.text}
                secondary={message.sender === 'user1' ? 'User 1' : 'User 2'}
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', padding: '8px', borderTop: '1px solid #ccc' }}>
        <TextField
          variant="outlined"
          fullWidth
          label="Type your message"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          sx={{ marginLeft: '8px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
