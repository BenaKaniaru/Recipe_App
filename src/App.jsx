import { useState } from "react";
import Header from "./components/Header";
import RecipeDashboard from "./RecipeDashboard";

export default function App() {
  const [recipeData, setRecipeData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [recipeId, setRecipeId] = useState(null);
  console.log(searchItem);
  return (
    <div>
      <Header
        recipeData={recipeData}
        setSearchItem={setSearchItem}
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
        searchItem={searchItem}
        recipeId={recipeId}
        setRecipeId={setRecipeId}
      />

      <div
        className={
          error
            ? "fixed inset-0 flex flex-col justify-center items-center"
            : "hidden"
        }
      >
        <div>
          <img src="./images.jpeg" alt="error image" />
          <span className="text-red-500 font-bold">Error: {error} </span>
        </div>
      </div>
    </div>
  );
}
