import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import UserProfile from "./userProfile";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-64 min-h-screen bg-orange-300 text-white flex flex-col">
      <div className="p-6 text-2xl font-semibold text-center">W(i)TF?</div>

      <Separator className="my-6  border-gray-600" />

      <div className="flex flex-col gap-4 px-6">
        <Button
          variant="link"
          className="text-white text-lg"
          onClick={() => navigate("/")}
        >
          Dashboard
        </Button>
        <Button
          variant="link"
          className="text-white text-lg"
          onClick={() => navigate("/my-fridge")}
        >
          My Fridge
        </Button>
        <Button
          variant="link"
          className="text-white text-lg"
          onClick={() => navigate("/search-recipes")}
        >
          Search Recipes
        </Button>
        <Button
          variant="link"
          className="text-white text-lg"
          onClick={() => navigate("/saved-recipes")}
        >
          Saved Recipes
        </Button>
      </div>

      <Separator className="my-6  border-gray-600" />

      <UserProfile />
    </div>
  );
}
