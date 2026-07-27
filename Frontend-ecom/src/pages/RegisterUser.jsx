import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import registerSchema from "../schemas/registerUser";

export default function RegisterUser() {
    const [errorMsg,setErrorMsg]=useState("");
    const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerSchema)
    })

    const [loading, setLoading] = useState(false);

    async function onSubmit(data) {
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result = await response.json();
            console.log(result)
            if(response.ok){
                navigate("/")
            }
            
        if (!response.ok) {
            setErrorMsg(result.message ?? "Registration failed.");
            return;
        }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex items-center justify-center p-8  bg-black">

                <div className="w-full max-w-[450px] rounded-2xl overflow-hidden border border-green-800/20 bg-[#062b1a] ">

                    <div className="bg-[#084F2D] px-9 py-8">
                        <p className="text-green-200/60 text-[10px] font-bold tracking-[2px] uppercase">
                            Get Started
                        </p>
                        <h1 className="text-white text-[26px] font-extrabold mt-2">
                            Create your
                            <br />
                            account
                        </h1>

                        <div className="mt-3 h-[3px] w-8 bg-[#fb641b]" />
                    </div>

                    <div className="p-8">

                        <div className="mb-4">
                            <label className="block text-green-200/80 text-xs font-bold uppercase mb-2">
                                Username
                            </label>

                            <input type="text" {...register('username')}
                                placeholder="Enter a username"
                                className="w-full rounded-lg bg-[#041f11]/50 border border-green-200/20 px-4 py-3 text-white outline-none focus:border-[#fb641b]"
                            />
                            {errors.username && <span>{errors.username.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-green-200/80 text-xs font-bold uppercase mb-2">
                                Email
                            </label>

                            <input type="text" {...register('email')}
                                placeholder="Enter your email"
                                className="w-full rounded-lg bg-[#041f11]/50 border border-green-200/20 px-4 py-3 text-white outline-none focus:border-[#fb641b]"
                            />
                            {errors.email && <span className="text-white  shadow-amber-400">{errors.email.message}</span>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-green-200/80 text-xs font-bold uppercase mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                {...register('password')}
                                placeholder="Create password"
                                className="w-full rounded-lg bg-[#041f11]/50 border border-green-200/20 px-4 py-3 text-white outline-none focus:border-[#fb641b]"
                            />
                            {errors.password && <span className="text-white  shadow-amber-400">{errors.password.message}</span>}
                        </div>

                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={loading}
                            className="w-full bg-[#fb641b] text-white py-3 rounded-lg font-bold hover:bg-[#e05510]">
                            {loading ? "Creating..." : "Create Account"}
                        </button>

                        {errorMsg && (
                            <p className="mt-3 text-yellow-400 text-sm text-center">{errorMsg}</p>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}