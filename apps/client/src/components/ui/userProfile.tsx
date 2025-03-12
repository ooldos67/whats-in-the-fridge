import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserProfile() {
  const { user, isAuthenticated } = useAuth0();

  console.log(user);

  return (
    isAuthenticated && (
      <div className="mt-auto flex items-center px-6 py-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src={user?.picture} alt={user?.name} />
          <AvatarFallback className="text-black">
            {user?.nickname ? user.nickname[0] : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-semibold text-black">{user?.nickname}</p>
        </div>
      </div>
    )
  );
}
