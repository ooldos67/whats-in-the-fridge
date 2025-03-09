import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-orange-300 text-white flex flex-col">
      <div className="p-6 text-2xl font-semibold border-b border-gray-600">
        What's in The Fridge
      </div>

      <div className="flex flex-col gap-4 mt-8 px-6">
        <Button variant="link" className="text-white text-lg">
          Dashboard
        </Button>
        <Button variant="link" className="text-white text-lg">
          My Fridge
        </Button>
        <Button variant="link" className="text-white text-lg">
          Search Recipes
        </Button>
        <Button variant="link" className="text-white text-lg">
          Saved Recipes
        </Button>
      </div>

      <Separator className="my-6 mx-6 border-gray-600" />

      <div className="mt-auto flex items-center px-6 py-4">
        <Avatar className="w-12 h-12">
          <AvatarImage src="/path/to/profile-image.jpg" alt="User Profile" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-semibold">Dom Wooldridge</p>
        </div>
      </div>
    </div>
  );
}
