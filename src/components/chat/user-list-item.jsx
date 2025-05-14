import { AvatarWithStatus } from "@/components/ui/avatar-with-status";

export function UserListItem({
  id,
  name,
  avatar,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline,
  isSelected,
  onClick,
}) {
  return (
    <div 
      className={`p-3 hover:bg-gray-50 cursor-pointer ${isSelected ? 'border-l-4 border-primary' : ''}`} 
      onClick={() => onClick(id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AvatarWithStatus src={avatar} name={name} isOnline={isOnline} />
          <div className="ml-3">
            <p className="text-foreground font-medium">{name}</p>
            {lastMessage ? (
              <p className="text-xs text-gray-400 truncate w-32">{lastMessage}</p>
            ) : (
              isOnline && (
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 ml-1">Online</span>
                </div>
              )
            )}
          </div>
        </div>
        <div>
          {timestamp && <p className="text-xs text-gray-400">{timestamp}</p>}
          {unreadCount > 0 && (
            <div className="bg-primary rounded-full h-5 w-5 flex items-center justify-center ml-auto mt-1">
              <span className="text-xs text-white">{unreadCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}