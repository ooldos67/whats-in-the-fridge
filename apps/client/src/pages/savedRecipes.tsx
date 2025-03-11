import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/ui/sidebar";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  mealType: string;
  dietaryRequirements: string;
  image?: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes`);
      if (!response.ok) throw new Error("Failed to fetch recipes");

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Saved Recipes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => (
              <Card key={recipe.id} className="max-w-sm bg-white shadow-md">
                <CardContent>
                  <div className="w-full h-48 bg-gray-200 mb-4">
                    <img
                      src={recipe.image || "/path/to/default-image.jpg"} // Fallback if no image
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
                    <strong>Ingredients:</strong>{" "}
                    {recipe.ingredients.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Meal Type:</strong> {recipe.mealType}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Dietary:</strong> {recipe.dietaryRequirements}
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
