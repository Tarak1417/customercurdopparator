import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md">
      <ul className="flex gap-6">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition"
          >
            Customers
          </Link>
        </li>
        <li>
          <Link
            to="/add"
            className="hover:text-blue-400 transition"
          >
            Add Customer
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="hover:text-blue-400 transition"
          >
            Search
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
