import React from 'react';
import Message from './Message';

interface MessageProps {
    messages: { sender: string; text: string }[];
    user: string;
}

const ChatWindow: React.FC<MessageProps> = ({ messages, user }) => {
    return (
        <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', marginBottom: '10px' }}>
            {messages.map((msg, index) => (
                <Message key={index} message={msg} user={user} />
            ))}
        </div>
    );
};

export default ChatWindow;
