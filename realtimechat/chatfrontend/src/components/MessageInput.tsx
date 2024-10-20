import React, { useState } from 'react';

interface MessageInputProps {
    socket: WebSocket | null;
    user: string;
}

const MessageInput: React.FC<MessageInputProps> = ({ socket, user }) => {
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (input.trim() && socket) {
            socket.send(JSON.stringify({ sender: user, text: input }));
            setInput('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default MessageInput;
