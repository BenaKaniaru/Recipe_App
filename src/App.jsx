import { useState } from "react";
import Header from "./components/Header";
import RecipeDashboard from "./RecipeDashboard";

export default function App() {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  return (
    <div>
      <Header
        recipeData={recipeData}
        setRecipeData={setRecipeData}
        setLoading={setLoading}
        loading={loading}
        error={error}
        setError={setError}
      />
      <RecipeDashboard
        recipeData={recipeData}
        loading={loading}
        error={error}
      />
    </div>
  );
}
