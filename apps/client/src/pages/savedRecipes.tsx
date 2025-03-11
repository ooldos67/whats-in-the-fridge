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
const userId = "3e7a22e8-f0d8-4fbd-9e08-a7b9a8677bf7"; // Temp hardcoded user

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes`);
      if (!response.ok) throw new Error("Failed to fetch recipes");

      const data = await response.json();
      setRecipes(data);
      setSavedRecipes(data.map((recipe: Recipe) => recipe.id));
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // const toggleSaveRecipe = (id: string) => {
  //   setSavedRecipes((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((recipeId) => recipeId !== id)
  //       : [...prev, id]
  //   );
  // };

  const handleSavedRecipes = async (recipe: Recipe, userId: string) => {
    const isCurrentlySaved = savedRecipes.includes(recipe.id);
    try {
      if (isCurrentlySaved) {
        const response = await fetch(`${BASE_URL}/recipes/${recipe.id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete recipe");
        setSavedRecipes((prev) =>
          prev.filter((recipeId) => recipeId !== recipe.id)
        );
      } else {
        const resavedRecipe = {
          userId: userId,
          title: recipe.title,
          ingredients: recipe.ingredients,
          mealType: recipe.mealType,
          dietaryRequirements: recipe.dietaryRequirements,
        };

        const response = await fetch(`${BASE_URL}/recipes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(resavedRecipe),
        });

        if (!response.ok) throw new Error("Failed to re-add recipe");
        setSavedRecipes((prev) => [...prev, recipe.id]);
      }
    } catch (error) {
      console.error("Error deleting or re-adding recipe: ", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Saved Recipes</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recipes.length > 0 ? (
            recipes.map((recipe) => {
              const isSaved = savedRecipes.includes(recipe.id);
              return (
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSavedRecipes(recipe, userId)}
                      >
                        <Heart
                          className={`w-5 h-5 transition ${
                            isSaved ? "text-red-500" : "text-gray-500"
                          }`}
                        />
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
              );
            })
          ) : (
            <p className="text-gray-500 text-lg">No saved recipes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
