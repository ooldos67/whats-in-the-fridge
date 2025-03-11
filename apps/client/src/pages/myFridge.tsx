import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Sidebar from "@/components/ui/sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

export default function MyFridge() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");

  const userId = "3e7a22e8-f0d8-4fbd-9e08-a7b9a8677bf7"; // temp hardcoded user
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Fetch ingredients from the backend on component mount
  const fetchFridge = async () => {
    try {
      const response = await fetch(`${BASE_URL}/fridge/${userId}`);
      if (!response.ok) throw new Error("Failed to fetch ingredients");

      const data = await response.json();
      setIngredients(data.ingredients);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };

  const addIngredient = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!ingredientName || !ingredientAmount) {
      alert("Please provide both ingredient name and amount.");
      return;
    }

    const newIngredient = {
      ingredientName: ingredientName,
      amount: ingredientAmount,
    };

    try {
      const response = await fetch(`${BASE_URL}/fridge/${userId}/ingredient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newIngredient),
      });

      if (!response.ok) throw new Error("Failed to add ingredient");

      fetchFridge();

      setIngredientName("");
      setIngredientAmount("");
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  const deleteIngredient = async (ingredientId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/fridge/${userId}/ingredient`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientId }),
      });

      if (!response.ok) throw new Error("Failed to delete ingredient");

      fetchFridge();
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  useEffect(() => {
    fetchFridge();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">My Fridge</h1>

        <form onSubmit={addIngredient} className="flex gap-4 mb-6">
          <Input
            placeholder="Add ingredient"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
          <Input
            placeholder="Amount"
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
          />
          <Button
            type="submit"
            className="transition-colors hover:scale-105 hover:cursor-pointer"
          >
            Add
          </Button>
        </form>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Remove</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ingredients.length > 0 ? (
                  ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                      <TableCell>{ingredient.name}</TableCell>
                      <TableCell>{ingredient.amount}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => deleteIngredient(ingredient.id)}
                          className="transition-colors hover:scale-105 hover:cursor-pointer"
                        >
                          <Trash className="w-5 h-5 text-white" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center">
                      No ingredients found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
