import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/ui/sidebar";
import { Heart, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  mealType: string;
  dietaryRequirements: string;
  method?: string;
  image?: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
const userId = "3e7a22e8-f0d8-4fbd-9e08-a7b9a8677bf7"; // Temp hardcoded user

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoadingMethod, setIsLoadingMethod] = useState(false);

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

  const handleRecipeClick = async (recipe: Recipe) => {
    try {
      if (recipe.method) {
        setSelectedRecipe(recipe);
        return;
      }
      setSelectedRecipe(recipe);
      setIsLoadingMethod(true);

      const methodPrompt = `Generate a list of simple steps for the following recipe: "${recipe.title}" with ingredients: ${recipe.ingredients.join(", ")}.`;

      const aiResponse = await fetch(`${BASE_URL}/ai-recipe-method`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: methodPrompt }),
      });

      if (!aiResponse.ok) throw new Error("Failed to generate recipe method");

      const data = await aiResponse.json();

      const parsedData = JSON.parse(data.method).method;
      const generatedMethod = parsedData;

      const updateResponse = await fetch(`${BASE_URL}/recipes/${recipe.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: generatedMethod }),
      });

      if (!updateResponse.ok)
        throw new Error("Failed to update recipe in database");

      setSelectedRecipe({ ...recipe, method: generatedMethod });
    } catch (error) {
      console.error("Error handling recipe click:", error);
    } finally {
      setIsLoadingMethod(false);
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
                <Card
                  key={recipe.id}
                  className="max-w-sm bg-white shadow-md"
                  onClick={() => handleRecipeClick(recipe)}
                >
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
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSavedRecipes(recipe, userId);
                        }}
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
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[80vh] overflow-y-auto relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setSelectedRecipe(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedRecipe.title}
              </h2>
              <h3 className="text-lg">
                <strong>Meal Type:</strong> {selectedRecipe.mealType}
              </h3>
              <h3 className="text-lg">
                <strong>Diet:</strong> {selectedRecipe.dietaryRequirements}
              </h3>
              <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
              <ul className="list-disc ml-6">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold mt-4">Method:</h3>
              {isLoadingMethod ? (
                <p className="text-gray-500 italic">Loading instructions...</p>
              ) : (
                <p>{selectedRecipe.method}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
