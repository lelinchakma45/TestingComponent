import React from 'react';
import ChatApp from './components/ChatApp';

const App: React.FC = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1>One-to-One Chat</h1>
            <ChatApp />
        </div>
    );
};

export default App;
