import { useState, useEffect } from "react";
import { TrophySpin, FourSquare } from "react-loading-indicators";
import { motion, AnimatePresence } from "framer-motion";
export default function RecipeDetails({ recipeId }) {
  const [loading, setLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [recipeDetails, setRecipeDetails] = useState();
  const [ingredientsLoaded, setIngredientsLoaded] = useState(false);
  const URL = `https://api.spoonacular.com/recipes/${recipeId}/information`;

  useEffect(() => {
    setIngredientsLoaded(false);
    if (!recipeId) return; //prevent unnecessary API calls

    const fetchRecipeDetails = async () => {
      setLoading(true);
      setDetailsError(null);
      try {
        const response = await fetch(
          `${URL}?apiKey=${import.meta.env.VITE_SPOONACULAR_API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Couldn't fetch recipe details. Please try again!");
        }
        const data = await response.json();
        setRecipeDetails(data);
      } catch (error) {
        setDetailsError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
    console.log(recipeDetails);
  }, [recipeId]);

  if (detailsError)
    return (
      <div>
        <h1 className="font-bold text-lg fixed text-red-600 italic">
          Recipe Details Error
        </h1>
        <div className="fixed flex right-80 top-40 flex-col text-center">
          <img src="./images.jpeg" alt="error image" />
          <span className="text-red-500 font-bold">Error: {detailsError} </span>
        </div>
      </div>
    );

  return (
    <AnimatePresence mode="await">
      <motion.div
        className="flex-1 overflow-y-auto mb-4 px-8 shadow-lg bg-gray-100 rounded-lg shadow-black m-4 h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        {!recipeId && (
          <div className="flex flex-col justify-center items-center gap-4 h-full">
            <h1>No Recipe Selected Yet!</h1>
            <div>
              <TrophySpin
                color={["red", "green", "blue", "orange"]}
                size="large"
                text="Select a Recipe to Display its Details Here!"
                textColor="blue"
              />
            </div>
          </div>
        )}

        {recipeId && (
          <div>
            <h1 className="font-bold text-lg">
              Recipe Details for {recipeDetails?.title}
            </h1>
            <div className="my-2 flex gap-1 md:gap-2 lg:gap-4 pt-4 italic text-sm md:text-md lg:text-lg font-semibold">
              <span>⏳Ready in {recipeDetails?.readyInMinutes} Minutes</span>
              <span>
                {recipeDetails?.vegetarian
                  ? "🥕Vegetarian"
                  : "🍖Non-vegetarian"}
              </span>
              <span>
                {recipeDetails?.glutenFree
                  ? "Gluten Free"
                  : "🌾Not Gluten Free"}
              </span>
              <span> Health Score: {recipeDetails?.healthScore}</span>
            </div>
            <div>
              <h1 className="font-black text-xl py-2">Ingredients</h1>

              <AnimatePresence mode="popLayout">
                {recipeDetails?.extendedIngredients?.map(
                  (ingredient, index) => (
                    <motion.div
                      className="grid grid-cols-[1fr_2fr] shadow-xl p-4 bg-white rounded-lg text-center align-center mb-4 w-full"
                      key={ingredient.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.5 }} // Stagger effect
                      onAnimationComplete={() => {
                        if (
                          index ===
                          recipeDetails.extendedIngredients.length - 1
                        ) {
                          setIngredientsLoaded(true);
                        }
                      }}
                    >
                      <img
                        className="w-100% h-auto rounded-lg mr-4"
                        src={
                          `https://spoonacular.com/cdn/ingredients_100x100/` +
                          ingredient.image
                        }
                        alt=""
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 ml-2">
                        <h3 className="font-semibold text-md text-left">
                          {ingredient.name}
                        </h3>
                        <h3 className="font-semibold text-md text-left">
                          {ingredient.amount} {ingredient.unit}
                        </h3>
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>

            {ingredientsLoaded && (
              <div>
                <h1 className="font-black my-2 text-lg">
                  Preparation Instructions
                </h1>
                <motion.ol
                  className="list-decimal list-inside space-y-2 p-4 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {recipeDetails?.analyzedInstructions[0]?.steps?.map(
                    (step, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        {step.step}
                      </motion.li>
                    )
                  )}
                </motion.ol>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
