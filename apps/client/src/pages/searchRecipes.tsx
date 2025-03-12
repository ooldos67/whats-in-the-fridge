import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Heart, ChevronDown, Check, X } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import { useEffect, useState } from "react";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

interface Recipe {
  recipeTitle: string;
  ingredients: string[];
  mealType: string;
  diet: string;
  image?: string;
}

export default function SearchRecipes() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [mealType, setMealType] = useState<string>("");
  const [dietaryRequirements, setDietaryRequirements] = useState<string>("");
  const [generatedRecipes, setGeneratedRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const userId = "3e7a22e8-f0d8-4fbd-9e08-a7b9a8677bf7"; // Temp hardcoded user
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchFridge = async () => {
    try {
      const response = await fetch(`${BASE_URL}/fridge/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch ingredients");

      const data = await response.json();
      setIngredients(data.ingredients);
      console.log(data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${BASE_URL}/recipes`);
      if (!response.ok) throw new Error("Failed to fetch recipes");

      const data = await response.json();
      setRecipes(data);
      console.log(recipes);
    } catch (error) {
      console.error("Error fetching recipes: ", error);
    }
  };

  useEffect(() => {
    fetchFridge();
    fetchRecipes();
  }, []);

  const toggleIngredient = (ingredientId: string) => {
    const ingredient = ingredients.find(
      (ingredient) => ingredient.id === ingredientId
    );
    if (ingredient) {
      setSelectedIngredients(
        (prev) =>
          prev.some((selected) => selected.id === ingredientId)
            ? prev.filter((item) => item.id !== ingredientId) // Remove if already selected
            : [...prev, ingredient] // Add if not already selected
      );
    }
  };

  const toggleSelectAll = () => {
    if (selectedIngredients.length === ingredients.length) {
      setSelectedIngredients([]);
    } else {
      setSelectedIngredients(ingredients);
    }
  };

  const handleSearchSubmit = async () => {
    function createPrompt() {
      const ingredientList = selectedIngredients
        .map(({ name, amount }) => `${name} (amount: ${amount})`)
        .join(", ");

      const meal =
        mealType && mealType !== "No Preference" ? mealType : "any time of day";

      const diet =
        dietaryRequirements && dietaryRequirements !== "No Preference"
          ? dietaryRequirements
          : "any";

      let prompt = `Can you give me three tasty realistic recipes. I have these ingredients available: ${ingredientList}.The recipes should be delicious and practical, using available ingredients where possible. Additional ingredients can be used to enhance the dish. The recipe should be suitable for only ${meal} time and for people on ${diet} diet. I would like only the recipe title, list of ingredients (leave out the quantities) I need for the recipe, Meal type, and the diet.`;

      if (dietaryRequirements && dietaryRequirements !== "No Preference") {
        prompt += ` The recipe should be ${dietaryRequirements.toLowerCase()}.`;
      }

      return prompt;
    }

    async function generateRecipe() {
      try {
        const response = await fetch(`${BASE_URL}/ai-recipe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: createPrompt() }),
        });

        if (!response.ok) throw new Error("Failed to generate recipe");

        const data = await response.json();
        console.log("API Response Data:", data);

        const parsedData = JSON.parse(data.recipe).recipes;

        console.log(parsedData);

        setGeneratedRecipes(parsedData);
      } catch (error) {
        console.error("Error generating recipe:", error);
      }
    }

    generateRecipe();
  };

  const handleSaveRecipe = async (recipe: Recipe, userId: string) => {
    const recipeToSave = {
      userId: userId,
      title: recipe.recipeTitle,
      ingredients: recipe.ingredients,
      mealType: recipe.mealType,
      dietaryRequirements: recipe.diet,
    };

    try {
      const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeToSave),
      });

      if (!response.ok) throw new Error("Failed to save recipe");

      const responseData = await response.json();
      console.log("Saved Recipe Response:", responseData);

      setSavedRecipes((prev) => [...prev, recipe.recipeTitle]);
    } catch (error) {
      console.error("Error saving recipe: ", error);
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>

        <div className="flex gap-4 mb-6">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-1/4 flex justify-between items-center"
              >
                {selectedIngredients.length === ingredients.length
                  ? "All Selected"
                  : selectedIngredients.length > 0
                    ? `${selectedIngredients.length} Selected`
                    : "My Fridge"}

                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white p-2 rounded shadow-md">
              <div
                className="flex items-center gap-2 p-2 border-b cursor-pointer"
                onClick={toggleSelectAll}
              >
                <Checkbox
                  checked={selectedIngredients.length === ingredients.length}
                />
                <span>Select All</span>
              </div>
              {ingredients.length > 0 ? (
                ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between gap-2 p-2 cursor-pointer"
                    onClick={() => toggleIngredient(ingredient.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={selectedIngredients.some(
                          (selected) => selected.id === ingredient.id
                        )}
                      />
                      <span className="flex justify-between w-full">
                        <span>{ingredient.name}</span>
                        <span className="text-sm text-gray-500 ml-2 italic">
                          {ingredient.amount}
                        </span>
                      </span>
                    </div>

                    {selectedIngredients.some(
                      (selected) => selected.id === ingredient.id
                    ) && <Check className="w-4 h-4 text-gray-800" />}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No ingredients found</div>
              )}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-1/4 flex justify-between items-center"
              >
                {mealType || "Meal Type"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-white p-2 rounded shadow-md">
              {[
                "No Preference",
                "Breakfast",
                "Lunch",
                "Dinner",
                "Dessert",
                "Snack",
              ].map((meal) => (
                <div
                  key={meal}
                  className="p-2 cursor-pointer flex items-center justify-between rounded hover:bg-gray-100"
                  onClick={() => setMealType(meal)}
                >
                  <span>{meal}</span>
                  {mealType === meal && (
                    <Check className="w-4 h-4 text-gray-800" />
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-1/4 flex justify-between items-center"
              >
                {dietaryRequirements || "Dietary Requirements"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 bg-white p-2 rounded shadow-md">
              {[
                "No Preference",
                "Vegetarian",
                "Vegan",
                "Gluten-Free",
                "Dairy-Free",
                "Keto",
              ].map((diet) => (
                <div
                  key={diet}
                  className="p-2 cursor-pointer flex items-center justify-between rounded hover:bg-gray-100"
                  onClick={() => setDietaryRequirements(diet)}
                >
                  <span>{diet}</span>
                  {dietaryRequirements === diet && (
                    <Check className="w-4 h-4 text-gray-800" />
                  )}
                </div>
              ))}
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleSearchSubmit}
            className="transition-colors hover:scale-105 hover:cursor-pointer"
          >
            Search Recipes
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {generatedRecipes?.length > 0 ? (
            generatedRecipes.map((recipe, index: number) => {
              const isSaved = savedRecipes.includes(recipe.recipeTitle);
              return (
                <Card
                  key={index}
                  className="max-w-sm bg-white shadow-md"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <CardContent>
                    <div className="w-full h-48 bg-gray-200 mb-4">
                      <img
                        src={recipe.image || "/path/to/recipe-image.jpg"}
                        alt={recipe.recipeTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">
                        {recipe.recipeTitle}
                      </h3>
                      <Button
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSaveRecipe(recipe, userId);
                        }}
                        variant="ghost"
                        size="icon"
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
                      <strong>Dietary:</strong> {recipe.diet}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <p className="text-gray-500">
              Add in your search filters to generate recipes...
            </p>
          )}
        </div>
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-3/4 max-w-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setSelectedRecipe(null)}
              >
                <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {selectedRecipe.recipeTitle}
              </h2>
              <p className="text-sm text-gray-600">
                <strong>Meal Type:</strong> {selectedRecipe.mealType}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Diet:</strong> {selectedRecipe.diet}
              </p>
              <h3 className="text-lg font-semibold mt-4">Ingredients:</h3>
              <ul className="list-disc ml-6">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
