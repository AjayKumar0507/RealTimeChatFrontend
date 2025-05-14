export function ChatBubble({
  message,
  timestamp,
  isUserMessage,
  senderAvatar,
  senderName,
}) {
  const sentBubbleClass = "bg-accent text-white chat-bubble-sent";
  const receivedBubbleClass = "bg-gray-100 text-foreground chat-bubble-received";

  if (isUserMessage) {
    return (
      
      <div className="flex justify-end mb-4 text-black ">
      <div className="bg-white  rounded-2xl rounded-tr-none p-3 shadow-sm max-w-[70%]">
        <p className="text-sm">{message}</p>
        <p className="text-xs text-white/70 text-right mt-1">10:26 AM</p>
      </div>
      </div>
        
    );
  }

  return (
    <div className="flex items-start">
      {senderAvatar && (
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80"
          alt={`${senderName || 'User'}'s avatar`} 
          className="w-8 h-8 rounded-full object-cover mr-3 mt-1" 
        />
      )}
      <div className="flex justify-start mb-4">
        <div className="bg-white rounded-2xl rounded-tl-none p-3 shadow-sm max-w-[70%]">
          <p className="text-sm">{message}</p>
          <p className="text-xs text-gray-400 text-right mt-1">10:24 AM</p>
        </div>
      </div>
      
    </div>
  );
}