import { Button } from "./button";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./userProfile";

export default function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <div className="flex gap-2 items-center">
        <UserProfile />
        <Button
          variant="outline"
          className="border border-black transition-colors hover:scale-105 hover:cursor-pointer"
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          Log Out
        </Button>
      </div>
    )
  );
}
