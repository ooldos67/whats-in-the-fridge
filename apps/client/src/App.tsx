import { Dashboard } from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import MyFridge from "./pages/myFridge";
import SearchRecipes from "./pages/searchRecipes";
import SavedRecipes from "./pages/savedRecipes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/my-fridge" element={<MyFridge />} />
      <Route path="/search-recipes" element={<SearchRecipes />} />
      <Route path="/saved-recipes" element={<SavedRecipes />} />
    </Routes>
  );
}

export default App;
