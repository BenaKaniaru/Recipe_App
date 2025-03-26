import Search from "./Search";
import { useState } from "react";
export default function Header({
  setLoading,
  setError,
  setRecipeData,
  searchInput,
  setSearchInput,
  setSearchItem,
}) {
  const [isOpen, setIsOpen] = useState();
  return (
    <header
      className="flex justify-between items-center
    bg-gray-600 text-white text-center p-2 w-full fixed top-0 left-0 right-0 z-60"
    >
      <div className=" flex items-center text-center font-bold px-4 text-xl md:text-2xl lg:text-4xl">
        <span>🍔</span>
        FlavorLink
      </div>
      <Search
        setRecipeData={setRecipeData}
        setLoading={setLoading}
        setError={setError}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setSearchItem={setSearchItem}
      />
      <div className="w-120 flex items-center md:items-end justify-end">
        <nav className="hidden md:flex gap-4  mr-8 text-lg font-medium">
          <span className=" cursor-pointer hover:text-blue-500">Home</span>
          <span className=" cursor-pointer hover:text-blue-500">Home</span>
          <span className=" cursor-pointer hover:text-blue-500">Home</span>
          <span className=" cursor-pointer hover:text-blue-500">Home</span>
        </nav>

        {/*Hamburger menu for small screens*/}

        <button
          className="flex md:hidden flex-col gap-1 cursor-pointer pr-8"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {!isOpen && (
            <div>
              <span className="block bg-white h-1 w-8 mb-1"></span>
              <span className="block bg-white h-1 w-8 mb-1 "></span>
              <span className="block bg-white h-1 w-8 mb-1"></span>
            </div>
          )}

          {isOpen && (
            <div>
              <span className="block bg-white h-1 w-8 transform rotate-45 translate-y-1/2"></span>
              <span className="bg-white h-1 w-8 hidden"></span>
              <span className="block bg-white h-1 w-8 transform -rotate-45 -translate-y-1/2"></span>
            </div>
          )}
        </button>

        {isOpen && (
          <nav className=" fixed md:hidden right-0 top-14 bg-gray-600 flex flex-col p-4 gap-2">
            <span className=" cursor-pointer hover:text-blue-500">Home</span>
            <span className=" cursor-pointer hover:text-blue-500">Home</span>
            <span className=" cursor-pointer hover:text-blue-500">Home</span>
            <span className=" cursor-pointer hover:text-blue-500">Home</span>
          </nav>
        )}
      </div>
    </header>
  );
}
