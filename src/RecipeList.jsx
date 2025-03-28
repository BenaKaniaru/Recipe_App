import { Riple } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";
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
        isMobile
          ? " w-full h-full text-sm"
          : "p-4 w-60 md:w-90 lg:w-120 overflow-y-auto mx-auto"
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
        <AnimatePresence mode="popLayout">
          {recipeData && recipeData.length > 0
            ? recipeData.map((recipe, index) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.5 }}
                  className={
                    isMobile
                      ? "bg-gray-200 p-4 w-full max-w-sm mx-auto h-full rounded-lg flex flex-col gap-2 shadow-md shadow-black cursor-pointer hover:border-2 hover:border-gray-400"
                      : "bg-gray-200 p-4 w-50 md:w-64 lg:w-96 rounded-lg flex flex-col gap-2 shadow-md shadow-black cursor-pointer hover:border-2 hover:border-gray-400"
                  }
                >
                  <img
                    className="rounded-lg w-3/4 m-auto"
                    src={recipe.image ? recipe.image : "/download.jpeg"}
                    alt="recipe image"
                  />
                  <h1 className="text-sm md:text-md lg:text-lg italic font-semi-bold">
                    {recipe.title}
                  </h1>
                  <button
                    className="bg-black p-1 w-32 text-white cursor-pointer hover:bg-gray-400"
                    onClick={() => setRecipeId(recipe.id)}
                  >
                    View Recipe
                  </button>
                </motion.div>
              ))
            : ""}
        </AnimatePresence>
      </div>
      <div className={loading ? "fixed top-75 left-40 z-10" : "hidden"}>
        <Riple color="#00008B" size="medium" text="loading" textColor="" />
      </div>
    </div>
  );
}
