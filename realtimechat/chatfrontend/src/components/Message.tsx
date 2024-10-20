import React from 'react';

interface MessageProps {
    message: { sender: string; text: string };
    user: string;
}

const Message: React.FC<MessageProps> = ({ message, user }) => {
    const isCurrentUser = message.sender === user;

    return (
        <div style={{ textAlign: isCurrentUser ? 'right' : 'left' }}>
            <div>
                <strong>{message.sender}</strong>: {message.text}
            </div>
        </div>
    );
};

export default Message;
