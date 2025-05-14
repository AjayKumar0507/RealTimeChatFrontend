import { useState, FormEvent } from 'react';
import { Smile, Paperclip, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaPlayCircle, FaArrowLeft, FaPhone, FaPaperPlane, FaPlus } from 'react-icons/fa';

export function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-4 rounded-full ">
      <form onSubmit={handleSubmit} className="flex items-center">
        <div className="w-full bottom-0 left-0 right-0 p-3  border-t border-gray-100">
          <div className="flex items-center bg-white  px-4 py-2 rounded-full">
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="text-black-500 hover:text-gray-700 hover:bg-gray-100 rounded-full mr-2"
            >
              <Smile className="h-5 w-5" />
            </Button>

            <input type="text" 
              placeholder="Type a message..." 
              className="bg-transparent outline-none flex-1 text-sm" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}    
            />
            <FaPaperPlane className="text-primary ml-2" />
          </div>
        </div>
      </form>
    </div>
  );
}