import { Riple } from "react-loading-indicators";
export default function RecipeList({
  recipeData,
  loading,
  searchItem,
  setRecipeId,
  isMobile,
}) {
  return (
    <div
      className={
        isMobile ? "w-full h-full" : "p-4 w-60 md:w-90 lg:w-120 overflow-y-auto"
      }
    >
      <div
        className={
          loading
            ? "opacity-25 grid grid-cols-1 gap-4 mx-8 mb-4 px-1 "
            : "grid grid-cols-1 gap-4 mx-8 mb-4 px-1"
        }
      >
        <h1>
          {recipeData && recipeData.length > 0 ? (
            <span className="text-black text-lg font-bold">
              Available {searchItem.toLowerCase()} recipes
            </span>
          ) : (
            <div className="fixed p-4 w-50 md:w-64 lg:w-96">
              <span className="text-red-500 text-lg font-bold ">
                No recipes found for {searchItem.toLowerCase()}
              </span>
              <img src="./image.jpeg" alt="" />
            </div>
          )}
        </h1>
        {recipeData && recipeData.length > 0
          ? recipeData.map((recipe) => (
              <div
                key={recipe.id}
                className={
                  isMobile
                    ? "bg-gray-200 p-4 w-full h-full rounded-lg flex flex-col gap-2 shadow-md shadow-black cursor-pointer hover:border-2 hover:border-gray-400"
                    : "bg-gray-200 p-4 w-50 md:w-64 lg:w-96 rounded-lg flex flex-col gap-2 shadow-md shadow-black cursor-pointer hover:border-2 hover:border-gray-400"
                }
              >
                <img
                  className="rounded-lg"
                  src={recipe.image ? recipe.image : "/download.jpeg"}
                  alt="recipe image"
                />
                <h1 className="text-lg italic font-semi-bold">
                  {recipe.title}
                </h1>
                <button
                  className="bg-black p-1 w-32 text-white cursor-pointer hover:bg-gray-400"
                  onClick={() => setRecipeId(recipe.id)}
                >
                  View Recipe
                </button>
              </div>
            ))
          : ""}
      </div>
      <div className={loading ? "fixed top-75 left-40 z-10" : "hidden"}>
        <Riple color="#00008B" size="medium" text="loading" textColor="" />
      </div>
    </div>
  );
}
