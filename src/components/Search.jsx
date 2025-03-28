import { useState, useEffect } from "react";
export default function Search({
  setLoading,
  setError,
  setRecipeData,
  setSearchItem,
}) {
  const [searchInput, setSearchInput] = useState("");
  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem("lastSearch") || "vegetarian";
  });

  const url = "https://api.spoonacular.com/recipes/complexSearch";
  console.log(import.meta.env.VITE_SPOONACULAR_API_KEY);

  async function fetchRecipes(searchInput) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${url}?query=${searchInput}&apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("Something went wrong! Please try again.");
      }
      const data = await response.json();
      setRecipeData(data.results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim() === "") {
      alert("Your search input is empty. Please enter a recipe name!");
      return;
    }

    setLastSearch(searchInput);
    localStorage.setItem("lastSearch", searchInput);
    fetchRecipes(searchInput);
    setSearchInput("");
  };

  useEffect(() => {
    fetchRecipes(lastSearch);
  }, []);

  return (
    <div className="w-full">
      <form className="flex flex-auto lg:mx-10" onSubmit={handleSubmit}>
        <input
          className=" flex-1 w-full max-w-2xl text-white focus:outline-none focus:ring-1 border-1 focus:w-36 border-gray-300 rounded-l-md p-2"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          name="search"
          value={searchInput}
          placeholder="Search for recipes"
        />
        <button
          className="p-2 bg-gray-300 rounded-r-md w-8 md:w-16 "
          type="submit"
        >
          🔍
        </button>
      </form>
    </div>
  );
}
