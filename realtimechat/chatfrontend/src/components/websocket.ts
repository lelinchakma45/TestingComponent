export const connectToWebSocket = (setMessages: React.Dispatch<React.SetStateAction<{ sender: string; text: string }[]>>) => {
    const ws = new WebSocket('ws://127.0.0.1:8000/api/messages/');

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    return ws;
};
