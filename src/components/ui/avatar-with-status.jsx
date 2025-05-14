import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarWithStatus({
  src,
  name,
  isOnline = false,
  size = "md",
  showStatus = true,
}) {
  const initials = name ? name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) : "";

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const statusSizeClasses = {
    sm: "h-2 w-2 absolute bottom-0 right-0",
    md: "h-3 w-3 absolute bottom-0 right-0",
    lg: "h-3.5 w-3.5 absolute bottom-0 right-0",
  };

  return (
    <div className="relative border-[3px] rounded-full border-white ">
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt={`${name}'s avatar`} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      {showStatus && (
        <span
          className={`${statusSizeClasses[size]  } ${
            isOnline ? "bg-success " : "bg-gray-400"
          } border-2 border-white   rounded-full text-white `}
        ></span>
      )}
    </div>
  );
}