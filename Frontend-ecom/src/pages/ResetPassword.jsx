import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import resetPasswordSchema from "../schemas/resetPasswordSchema";
import { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { loginUserContext } from "../context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { emailToResetPass } = useContext(loginUserContext);

  async function resetPassword(data) {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailToResetPass,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        console.log(result.message);
        return;
      }

      console.log(result.message);
      navigate('/login')
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-orange-50 pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Reset Password
              </h1>

              <p className="text-slate-500 mt-2">
                Create a new password for your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(resetPassword)}
              className="space-y-5"
            >
              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 pr-12 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}