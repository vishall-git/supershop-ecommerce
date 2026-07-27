import { Link } from "react-router-dom";
import '../../index.css'
import { FaShoppingCart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from "../../assets/supershop.png";
import  {CartCountContext} from "../../context/CountContext";
import { useContext } from "react";

export default function Navbar() {
  const {count}=useContext(CartCountContext);
  return (
    <nav
      className="
      fixed top-0 left-0
      w-full h-24
      flex items-center
      bg-[#084F2D]
      px-2 sm:px-4 md:px-6
      z-50
    "
    >
      {/* Logo */}
      <Link
        to="/"
        className="
          shrink-0
          w-20
          sm:w-24
          md:w-28
          lg:w-32
        "
      >
        <img
          className="w-full h-auto object-contain"
          src={logo}
          alt="Supershop Logo"
        />
      </Link>

      {/* Search Bar */}
      <div
        className="
          flex-1
          flex items-center
          mx-2
          max-w-[180px]
          sm:max-w-[300px]
          md:max-w-[450px]
          lg:max-w-none
        "
      >
        <input
          className="
            w-full
            bg-white
            border
            rounded-l-lg
            px-2 sm:px-3
            py-2
            outline-none
          "
          type="text"
          placeholder="Search"
        />

        <button
          className="
            bg-white
            rounded-r-lg
            px-2 sm:px-3
            py-2
          "
        >
          <IoIosSearch className="w-5 h-6 sm:w-6 sm:h-6 cursor-pointer" />
        </button>
      </div>

      {/* Login */}
      <Link to="/login">
        <div
          className="
            px-2 py-2
            flex gap-2 items-center
            border-2 border-transparent
            hover:border-white
            rounded-[3px]
            text-white
            hover:text-black
            hover:bg-white
            transition-all duration-300
            hover:scale-105
          "
        >
          <CgProfile className="text-2xl" />

          <span className="hidden md:inline font-sans tracking-wider">
            LOGIN
          </span>
        </div>
      </Link>

      {/* Cart */}
      <Link to="/cart">
        <div
          className="
            relative
            px-2 py-2
            flex gap-2 items-center
            border-2 border-transparent
            hover:border-white
            rounded-[3px]
            text-white
            hover:text-black
            hover:bg-white
            transition-all duration-300
            hover:scale-105
          "
        >
          <FaShoppingCart className="text-2xl" />

          {/* Cart Count */}
          <div
            className="
              absolute
              -top-1
              -right-2
              bg-red-500
              text-white
              text-xs
              rounded-full
              min-w-[18px]
              h-[18px]
              px-1
              flex items-center justify-center
            "
          >
            {count}
          </div>

          <span className="hidden md:inline font-sans tracking-wider">
            CART
          </span>
        </div>
      </Link>
    </nav>
  );
}