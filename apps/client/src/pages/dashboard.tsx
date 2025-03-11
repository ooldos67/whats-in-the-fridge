import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">What's in the Fridge?</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <Card className="p-4 md:col-span-1">
          <CardHeader>
            <CardTitle>Search Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Find creative and delicious meal ideas using the ingredients you
              already have. Let’s turn what’s in your fridge into something
              amazing!
            </p>
            <Button
              variant="outline"
              className="mt-4 transition-colors hover:scale-105 hover:cursor-pointer"
              onClick={() => navigate("/search-recipes")}
            >
              Explore
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-orange-300 text-white p-4 md:col-span-2">
          <CardHeader>
            <CardTitle>My Fridge</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Easily manage and keep track of the ingredients you have at home.
              Reduce food waste, stay organized, and make sure nothing goes to
              waste.
            </p>
            <Button
              className="mt-4 bg-black text-white transition-colors hover:scale-105 hover:cursor-pointer"
              onClick={() => navigate("/my-fridge")}
            >
              Open the Fridge
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-orange-300 text-white p-4 md:col-span-2">
          <CardHeader>
            <CardTitle>Saved Recipes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Save your favorite recipes in one convenient place. Whether it’s a
              go-to meal or something new you want to try, access them anytime
              with ease.
            </p>
            <Button
              className="mt-4 bg-black text-white transition-colors hover:scale-105 hover:cursor-pointer"
              onClick={() => navigate("/saved-recipes")}
            >
              Get Cooking!
            </Button>
          </CardContent>
        </Card>

        <Card className="p-4 md:col-span-1">
          <CardHeader>
            <CardTitle>Scan Your Fridge</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Take picture of youre phone and let AI create a list of
              ingredients for you!
            </p>
            <Button
              variant="outline"
              className="mt-4 transition-colors hover:scale-105 hover:cursor-pointer"
            >
              Take Picture
            </Button>
          </CardContent>
        </Card>

        {/* <button
          onClick={() => {
            fetch("http://localhost:8080/ai-recipe", {
              method: "POST",
            });
          }}
        >
          TEST
        </button> */}
      </div>
    </div>
  );
}
