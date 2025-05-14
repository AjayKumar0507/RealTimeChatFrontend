import { useRef, useEffect } from 'react';
import { ChatBubble } from '@/components/ui/chat-bubble';
import { TypingIndicator } from '@/components/ui/typing-indicator';

export function MessageList({ messages, currentUser, selectedUser }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!selectedUser) return null;

  return (
    <div className="flex-grow p-4 overflow-y-auto flex text-black flex-col space-y-4">
      {messages.map((message) => (
        <ChatBubble
          key={message.id}
          message={message.content}
          timestamp={message.timestamp}
          isUserMessage={message.senderId === currentUser.id}
          senderAvatar={message.senderId !== currentUser.id ? selectedUser.avatar : undefined}
          senderName={message.senderId !== currentUser.id ? selectedUser.name : undefined}
        />
      ))}
      
      {selectedUser.isTyping && (
        <TypingIndicator 
          avatar={selectedUser.avatar} 
          name={selectedUser.name} 
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
}