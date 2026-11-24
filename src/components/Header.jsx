import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectCartCount } from "../redux/cartSlice";

function Header() {
  const cartCount = useSelector(selectCartCount);
  return (
    <>
      <div className="flex justify-between bg-gray-100">
        <div className="flex flex-row gap-2">
          <Link to="/" className="text-3xl text-cyan-900 ml-5 font-bold">
            Cart-Redux
          </Link>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-base my-3 ml-8 text-cyan-600 transition hover:text-cyan-600/50"
                : "text-base my-3 ml-8 hover:text-gray-900/50"
            }
            end
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "text-base my-3 ml-8 text-cyan-600 transition hover:text-cyan-600/50"
                : "text-base my-3 ml-8 hover:text-gray-900/50"
            }
          >
            Products
          </NavLink>
        </div>
        <div className="flex flex-row-reverse items-center mr-4">
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-cart4"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
            </svg>
          </Link>
          <div className="bg-cyan-900 text-white rounded-2xl px-2">
            {cartCount}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
