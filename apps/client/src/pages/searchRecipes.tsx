import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Heart, ChevronDown, Check } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { openai } from "openai";

// Fake data for recipes (replace with real data later)
const fakeRecipes = Array.from({ length: 15 }, (_, index) => ({
  title: `Recipe ${index + 1}`,
  ingredients: "Tomatoes, Cheese, Basil",
  mealType: "Lunch",
  dietary: "Vegetarian",
  image: "/path/to/recipe-image.jpg", // Replace with actual image path
}));

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

const OPEN_AI = import.meta.env.OPENAI_API_KEY;
console.log(OPEN_AI);

export default function SearchRecipes() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const [mealType, setMealType] = useState<string>("");
  const [dietaryRequirements, setDietaryRequirements] = useState<string>("");
  const [recipeSearchCriteria, setRecipeSearchCriteria] = useState<{
    ingredients: Ingredient[];
    mealType: string;
    dietaryRequirements: string;
  }>({
    ingredients: [],
    mealType: "",
    dietaryRequirements: "",
  });

  const userId = "3e7a22e8-f0d8-4fbd-9e08-a7b9a8677bf7"; // Temp hardcoded user
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const fetchFridge = async () => {
    try {
      const response = await fetch(`${BASE_URL}/fridge/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch ingredients");

      const data = await response.json();
      setIngredients(data.ingredients);
      console.log(ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  useEffect(() => {
    fetchFridge();
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
      // if all ingredients are selected, clear the selection.
      setSelectedIngredients([]);
    } else {
      // selected ingredients = the list of ingredients from fetchFridge()
      setSelectedIngredients(ingredients);
    }
  };

  const handleSearchSubmit = () => {
    setRecipeSearchCriteria({
      ingredients: selectedIngredients,
      mealType,
      dietaryRequirements,
    });

    console.log("Saved search criteria:", {
      ingredients: selectedIngredients,
      mealType,
      dietaryRequirements,
    });
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>

        <div className="flex gap-4 mb-8 items-center">
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

          {/* Search Button (No functionality for now) */}
          <Button onClick={handleSearchSubmit} className="w-1/4 p-3">
            Search Recipes
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fakeRecipes.map((recipe, index) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
