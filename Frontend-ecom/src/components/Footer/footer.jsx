import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-200 mt-auto">
      <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">SuperShop</h2>
          <p className="mt-3 text-sm text-neutral-400 leading-6">
            A modern e-commerce application built using the MERN stack.
            Browse products, add items to your cart, and enjoy a seamless
            shopping experience.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Navigation
          </h3>

          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>

            <li>
              <Link to="/cart" className="hover:text-white">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Built With
          </h3>

          <ul className="space-y-2 text-sm text-neutral-400">
            <li>React.js</li>
            <li>Node.js & Express</li>
            <li>MongoDB</li>
            <li>Tailwind CSS</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-neutral-700 py-4 text-center text-sm text-neutral-400">
        © {new Date().getFullYear()} SuperShop. Built with ❤️ using the MERN Stack.
      </div>
    </footer>
  );
}