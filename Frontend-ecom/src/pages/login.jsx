import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../schemas/loginSchema.jsx";
import { loginUserContext } from "../context/AuthContext.jsx";
import {
  HiOutlineShoppingBag,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineArrowRightOnRectangle,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { CartCountContext } from "../context/CountContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { isLoggined, setIsLoggined } = useContext(loginUserContext);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        setIsLoggined(true);
        
        navigate("/");
        return;
      }
      if (!response.ok) {
        setErrorMsg(result.message ?? "Login failed.");
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      {isLoggined ? (
        <ProfileDashboard setIsLoggined={setIsLoggined} navigate={navigate} />
      ) : (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50 pt-24 pb-16 px-4 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
                <p className="text-slate-500 mt-2">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex-col">
                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-0">Password</label>
                  <input
                    type="password"
                    {...register("password")}
                    placeholder="••••••••"
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
                  )}
                </div>
               <Link to='/ForgotPassword'>
               <div className="text-xs font-medium text-orange-600 hover:underline pb-5 pt-2">Forget Password?</div>
               </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-60 "
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>

              

                <p className="text-center text-sm text-slate-600 pt-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-orange-600 font-medium hover:underline">
                    Create one
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {errorMsg && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl">
                <h3 className="text-lg font-bold text-red-600">Login Failed</h3>
                <p className="text-slate-600 mt-2 text-sm">{errorMsg}</p>
                <button
                  onClick={() => setErrorMsg("")}
                  className="mt-4 bg-[#fb641b] hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

function ProfileDashboard({ setIsLoggined, navigate }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const {setCount} = useContext(CartCountContext)

  async function handleLogout() {
    setLoggingOut(true);
    setCount(0)
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoggined(false);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-linear-to-b mt-26 from-slate-50 to-slate-100 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Welcome card */}
        <div className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-10 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
              <HiOutlineSparkles className="text-4xl text-white" />
            </div>
            <div className="flex-1">
              <p className="text-slate-300 text-sm uppercase tracking-wider">You're signed in</p>
              <h1 className="text-2xl sm:text-3xl font-bold mt-1">Welcome back!</h1>
              <p className="text-slate-400 text-sm mt-2">
                Happy shopping — jump back into what you were doing.
              </p>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-60"
            >
              <HiOutlineArrowRightOnRectangle className="text-lg" />
              {loggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        {/* Quick navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <QuickTile
            to="/"
            icon={<HiOutlineHome />}
            title="Continue Shopping"
            desc="Browse the latest products"
            color="from-indigo-500 to-blue-600"
          />
          <QuickTile
            to="/cart"
            icon={<HiOutlineShoppingBag />}
            title="My Cart"
            desc="Review items in your cart"
            color="from-orange-500 to-orange-600"
          />
          <QuickTile
            to="/"
            icon={<HiOutlineHeart />}
            title="Deals for You"
            desc="Hand-picked offers"
            color="from-pink-500 to-rose-600"
          />
        </div>

        {/* Info strip */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
          <h2 className="text-lg font-semibold text-slate-900">Your session is active</h2>
          <p className="text-sm text-slate-500 mt-1">
            You can safely browse and manage your cart. Click <span className="font-medium text-slate-700">Logout</span> above when you're done.
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickTile({ to, icon, title, desc, color }) {
  return (
    <Link
      to={to}
      className="group bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className={`w-11 h-11 rounded-xl bg-linear-to-br ${color} text-white flex items-center justify-center text-xl shadow-md mb-3 group-hover:scale-110 transition`}>
        {icon}
      </div>
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
    </Link>
  );
}
