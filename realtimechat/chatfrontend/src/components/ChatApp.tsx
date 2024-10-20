import React, { useEffect, useState } from 'react';
import { connectToWebSocket } from './websocket';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';

interface Message {
    sender: string;
    text: string;
}

const ChatApp: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [user, setUser] = useState<string>('User1'); // Replace with actual user logic

    useEffect(() => {
        const ws = connectToWebSocket(setMessages);
        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <ChatWindow messages={messages} user={user} />
            <MessageInput socket={socket} user={user} />
        </div>
    );
};

export default ChatApp;
