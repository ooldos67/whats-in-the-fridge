import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./button";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <Button
        className=" bg-black text-white transition-colors hover:scale-105 hover:cursor-pointer"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </Button>
    )
  );
}
