import { useState } from "react"
import Navbar from "../components/Navbar"
export default function Login() {
    return (
        <>
            <Navbar />
            <LoginPage />
        </>
    )
}

function LoginPage() {
    const [message, setMessage] = useState(false)
    return (
        <div className="p-50  flex justify-center">

            <div className="w-140 h-100 p-30 pt-10 rounded-xl bg-[#084F2D] 
            flex flex-col 
            justify-center">

                <h1 className="p-2 block mx-auto rounded mb-6 text-3xl text-white  tracking-wider">LOGIN</h1>
                <input type="text" placeholder="Number"
                    className="p-2 bg-white w-50 block mx-auto rounded-[3px] mb-5" />

                <input type="password" placeholder="password"
                    className="p-2 bg-white w-50 block mx-auto mb-10 rounded-[3px]" />

                <button onClick={() => setMessage(true)}
                    className="bg-[#fb641b]
                          block mx-auto text-white
                          px-6 py-2
                          rounded-[3px]
                          active:scale-110 duration-300
                        
                ">submit</button>
                {message && <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center">
                    <div className="w-140 h-100 p-30 pt-10 rounded-xl bg-[#084F2D] 
                                    flex flex-col justify-center items-center text-white" >
                        No Record Found !
                        Create A Account
                        <button
                            onClick={() => setMessage(false)}
                            className="absolute top-4 right-4 bg-yellow-400 text-white px-4 py-1 rounded
                             hover:bg-yellow-500">
                            X
                        </button>
                    </div>
                </div>}
            </div>
        </div>
    )
}