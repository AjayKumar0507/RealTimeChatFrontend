import { MessageSquare } from "lucide-react";

export function EmptyChat() {
  return (
    <div className=" w-full h-full flex-grow flex items-center justify-center p-4 bg-gray-50">
      <div className="text-center">
        <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-gray-900 font-medium">Select a conversation</h3>
        <p className="text-gray-500 text-sm mt-1">Choose a contact to start chatting</p>
      </div>
    </div>
  );
}