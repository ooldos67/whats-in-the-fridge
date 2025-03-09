import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Sidebar from "@/components/ui/sidebar";

// Fake data for recipes (replace with real data later)
const fakeRecipes = Array.from({ length: 15 }, (_, index) => ({
  title: `Recipe ${index + 1}`,
  ingredients: "Tomatoes, Cheese, Basil",
  mealType: "Lunch",
  dietary: "Vegetarian",
  image: "/path/to/recipe-image.jpg", // Replace with actual image path
}));

export default function SearchRecipes() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">Search Recipes</h1>

        <div className="flex gap-4 mb-8 items-center">
          {/* Ingredients Search Bar */}
          <Input placeholder="Enter ingredients" className="w-1/3 p-3" />

          <Select>
            <SelectTrigger className="w-1/4">
              <Button variant="outline" className="w-full">
                Meal Type
              </Button>
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="dessert">Dessert</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-1/4">
              <Button variant="outline" className="w-full">
                Dietary Requirements
              </Button>
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              <SelectItem value="dairy-free">Dairy-Free</SelectItem>
              <SelectItem value="keto">Keto</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Button (No functionality for now) */}
          <Button className="w-1/4 p-3">Search Recipes</Button>
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
