import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import forgotPasswordSchema from "../schemas/forgotPasswordSchema";
import { useContext, useState, useEffect, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { loginUserContext } from "../context/AuthContext";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const navigate = useNavigate();
  const authContext = useContext(loginUserContext);

  const [showInvalidOtpModal, setShowInvalidOtpModal] = useState(false);
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [sentEmail, setSentEmail] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(cooldownRef.current);
  }, []);

  function startCooldown() {
    setCooldown(30);
    clearInterval(cooldownRef.current);
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function sendOtp(email) {
    setApiError("");
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgotpassword`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        setApiError(result?.message || "Email is not registered.");
        return false;
      }
      return true;
    } catch (err) {
      console.error(err.message);
      setApiError("Something went wrong. Please check your connection and try again.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp(data) {
    const ok = await sendOtp(data.email);
    if (ok) {
      setSentEmail(data.email);
      setStep("otp");
      startCooldown();
    }
  }

  async function handleResend() {
    const ok = await sendOtp(sentEmail);
    if (ok) {
      setValue("otp", "");
      startCooldown();
    }
  }


  async function handleOtpVerification(data) {
    setApiError("");
    setShowInvalidOtpModal(false);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: sentEmail,
            otp: data.otp,
          }),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (response.status === 400) {
        setShowInvalidOtpModal(true);
        return;
      }

      if (!response.ok) {
        setApiError(
          result?.message || "Something went wrong. Please try again."
        );
        return;
      }

      authContext?.setEmailToReset?.(sentEmail);
      navigate("/ResetPassword");
    } catch (err) {
      console.error(err);
      setApiError("Something went wrong. Please check your connection and try again.");
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
              <h1 className="text-3xl font-bold text-slate-900">Forgot Password</h1>
              <p className="text-slate-500 mt-2">Reset password via OTP sent on your email.</p>
            </div>

            {showInvalidOtpModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="w-[90%] max-w-sm rounded-xl bg-white p-6 shadow-2xl">
                  <h2 className="text-xl font-bold text-red-600">
                    Invalid OTP
                  </h2>

                  <p className="mt-3 text-gray-600">
                    The OTP you entered is invalid. Please check it and try again.
                  </p>

                  <button
                    onClick={() => setShowInvalidOtpModal(false)}
                    className="mt-6 w-full rounded-lg bg-orange-500 py-2 text-white hover:bg-orange-600"
                  >
                    OK
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-5">
              {step === "email" ? (
                <form onSubmit={handleSubmit(handleSendOtp)} className="space-y-5" noValidate>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      {...register("email", { onChange: () => { setApiError('') } })}
                      className="mb-2 w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                    )}
                    {apiError && (
                      <p className="px-4 pb-3 text-red-600 text-sm">
                        {apiError}
                      </p>
                    )}
                  </div>



                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center"
                  >
                    {loading ? <BeatLoader color="#ffffff" size={8} margin={4} /> : "Send OTP"}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSubmit(handleOtpVerification)} className="space-y-5" noValidate>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">
                      Code sent to <span className="font-medium text-slate-900">{sentEmail}</span>
                    </p>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={6}
                      placeholder="Enter OTP"
                      {...register("otp", { onChange: () => { setApiError('') } })}
                      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                    />
                    {errors.otp && (
                      <p className="mt-1 text-xs text-red-600">{errors.otp.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition flex items-center justify-center"
                  >
                    {loading ? <BeatLoader color="#ffffff" size={8} margin={4} /> : "Verify"}
                  </button>

                  <p className="text-center text-sm text-slate-600">
                    Didn't get a code?{" "}
                    {cooldown > 0 ? (
                      <span className="text-slate-400">Resend in {cooldown}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={loading}
                        className="text-orange-600 font-medium hover:underline disabled:opacity-60"
                      >
                        Resend
                      </button>
                    )}
                  </p>
                </form>
              )}

              <p className="text-center text-sm text-slate-600">
                Remember your password?{" "}
                <Link to="/login" className="text-orange-600 font-medium hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}