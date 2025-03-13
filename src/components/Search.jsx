import { useState } from "react";
export default function Search({ setLoading, setError, setRecipeData }) {
  const [searchInput, setSearchInput] = useState("");

  const url = "https://api.spoonacular.com/recipes/complexSearch";
  const API_KEY = "1cee92b5ef904e19865a35efa82f527e";

  async function fetchRecipes() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${url}?query=${searchInput}&apiKey=${API_KEY}`
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
    }
    fetchRecipes();
  };

  return (
    <div className="w-full">
      <form className="flex flex-auto mx-10" onSubmit={handleSubmit}>
        <input
          className=" flex-1 text-white focus:outline-none focus:ring-1 border-1 border-gray-300 rounded-l-md p-2 max-w-4xl"
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          name="search"
          value={searchInput}
          placeholder="Search for recipes"
        />
        <button className="p-2 bg-gray-300 rounded-r-md w-16" type="submit">
          🔍
        </button>
      </form>
    </div>
  );
}
