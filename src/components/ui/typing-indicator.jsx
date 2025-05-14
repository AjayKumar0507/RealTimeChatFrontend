export function TypingIndicator({ avatar, name }) {
  return (
    <div className="flex items-start">
      {avatar && (
        <img 
          src={avatar} 
          alt={`${name || 'User'}'s avatar`} 
          className="w-8 h-8 rounded-full object-cover mr-3 mt-1" 
        />
      )}
      <div className="bg-gray-100 p-3 rounded-lg chat-bubble-received">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}