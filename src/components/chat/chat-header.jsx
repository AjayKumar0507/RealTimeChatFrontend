import { AvatarWithStatus } from "@/components/ui/avatar-with-status";
import { Video, Phone, MoreVertical } from "lucide-react";

export function ChatHeader({ name, avatar, isOnline, isTyping }) {
  return (
    <div className="p-4 text-white border-border flex items-center justify-between gradient-bg ">
      <div className="flex items-center ">
        <AvatarWithStatus src={avatar} name={name} isOnline={isOnline} />
        <div className="ml-3">
          <p className="text-foreground font-medium">{name}</p>
          <div className="flex items-center">
            {isOnline && <span className="h-2 w-2 bg-success  rounded-full"></span>}
            <span className="text-xs text-white-400 ml-1">
              {isTyping ? "Online • Typing..." : "Online"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3">
        <div className="ml-auto w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Video className="h-5 w-5" />
        </div>
        <div className="ml-auto w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Phone className="h-5 w-5" />
        </div>
        <div className="ml-auto w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <MoreVertical className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}