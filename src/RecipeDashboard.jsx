import RecipeList from "./RecipeList";
export default function RecipeDashboard({ recipeData, loading, error }) {
  return (
    <div>
      <RecipeList />
    </div>
  );
}
