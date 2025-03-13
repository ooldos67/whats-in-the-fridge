import { Dashboard } from "./pages/dashboard";
import { Routes, Route } from "react-router-dom";
import MyFridge from "./pages/myFridge";
import SearchRecipes from "./pages/searchRecipes";
import SavedRecipes from "./pages/savedRecipes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/my-fridge"
        element={
          <ProtectedRoute>
            <MyFridge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search-recipes"
        element={
          <ProtectedRoute>
            <SearchRecipes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saved-recipes"
        element={
          <ProtectedRoute>
            <SavedRecipes />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
