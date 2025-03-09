import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/ui/sidebar";
import { Heart } from "lucide-react";

// Fake saved recipes
const savedRecipes = Array.from({ length: 10 }, (_, index) => ({
  title: `Saved Recipe ${index + 1}`,
  ingredients: "Tomatoes, Cheese, Basil",
  mealType: "Dinner",
  dietary: "Vegan",
  image: "/path/to/recipe-image.jpg", // Replace with actual image path
}));

export default function SavedRecipes() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Saved Recipes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {savedRecipes.length > 0 ? (
            savedRecipes.map((recipe, index) => (
              <Card key={index} className="max-w-sm bg-white shadow-md">
                <CardContent>
                  <div className="w-full h-48 bg-gray-200 mb-4">
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{recipe.title}</h3>
                    <Button variant="ghost" size="icon">
                      <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 transition" />
                    </Button>
                  </div>

                  <p className="text-sm text-gray-600 mb-2">
                    Ingredients: {recipe.ingredients}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    Meal Type: {recipe.mealType}
                  </p>
                  <p className="text-sm text-gray-600">
                    Dietary: {recipe.dietary}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-gray-500 text-lg">No saved recipes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
