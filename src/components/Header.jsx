import Search from "./Search";
export default function Header({ setLoading, setError, setRecipeData }) {
  return (
    <header
      className="flex justify-between items-center
    bg-gray-600 text-white text-center p-4 w-full"
    >
      <div className="font-bold w-120 text-xl md:text-2xl lg:text-4xl">
        🍔FlavorLink
      </div>
      <Search
        setRecipeData={setRecipeData}
        setLoading={setLoading}
        setError={setError}
      />
      <div className="w-120 flex items-center md:items-end justify-end">
        <nav className="hidden md:flex gap-4 cursor-pointer">
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
        </nav>

        {/*Hamburger menu for small screens*/}
        <div className="flex md:hidden flex-col gap-1 cursor-pointer">
          <span className="bg-white h-1 w-8"></span>
          <span className="bg-white h-1 w-8"></span>
          <span className="bg-white h-1 w-8"></span>
        </div>
      </div>
    </header>
  );
}
