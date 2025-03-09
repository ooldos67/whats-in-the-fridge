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

export default function MyFridge() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <h1 className="text-3xl font-bold mb-6">My Fridge</h1>

        <div className="flex gap-4 mb-6">
          <Input placeholder="Add ingredient" />
          <Input placeholder="Amount" />
          <Button>Add</Button>
        </div>

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
                {/* {ingredients.map((item, index) => ( */}
                <TableRow>
                  <TableCell>Banana</TableCell>
                  <TableCell>3</TableCell>
                  <TableCell>
                    <Button>
                      <Trash className="w-5 h-5 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
