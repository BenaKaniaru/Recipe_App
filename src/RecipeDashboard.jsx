import { useState, useEffect } from "react";
import RecipeList from "./RecipeList";
import RecipeDetails from "./RecipeDetails";
export default function RecipeDashboard({
  recipeData,
  loading,
  error,
  searchItem,
  recipeId,
  setRecipeId,
  setShowDetails,
  showDetails,
}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  //const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //show recipeDetails if a recipe is selected on mobile

  useEffect(() => {
    if (isMobile && recipeId) {
      setShowDetails(true);
    }
  }, [recipeId, isMobile]);

  const handleBack = () => {
    setShowDetails(false);
    setRecipeId(null);
  };

  return (
    <div className={error ? "hidden" : "mt-18 flex w-full h-screen"}>
      {/*conditional rendering of recipe details on mobile view */}

      {isMobile && showDetails && (
        <div className="w-full">
          <button
            className="text-black ml-4 hover:underline cursor-pointer"
            onClick={handleBack}
          >
            {"<- Back to Recipes"}
          </button>
          <RecipeDetails recipeId={recipeId} error={error} />
        </div>
      )}

      {/*conditional rendering of recipe List on mobile view*/}
      {isMobile && !recipeId && (
        <div className="w-full h-screen">
          <RecipeList
            recipeData={recipeData}
            loading={loading}
            error={error}
            searchItem={searchItem}
            recipeId={recipeId}
            setRecipeId={setRecipeId}
            isMobile={isMobile}
          />
        </div>
      )}

      {/*conditional rendering of recipe dashboard on desktop view*/}

      {!isMobile && (
        <div className=" flex w-full h-screen">
          <RecipeList
            recipeData={recipeData}
            loading={loading}
            error={error}
            searchItem={searchItem}
            recipeId={recipeId}
            setRecipeId={setRecipeId}
            isMobile={isMobile}
          />

          <RecipeDetails recipeId={recipeId} error={error} />
        </div>
      )}
    </div>
  );
}
