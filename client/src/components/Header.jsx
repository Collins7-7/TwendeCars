import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-slate-900 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-300">Twende</span>
            <span className="text-slate-500">Cars</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-800" />
        </form>
        <ul className="flex gap-4 text-white">
          <Link to="/">
            <li className="hidden sm:inline hover:underline">Home</li>
          </Link>

          <Link to="/about">
            <li className="hidden sm:inline hover:underline">About</li>
          </Link>

          <Link to="/signin">
            <li className=" hover:underline">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
