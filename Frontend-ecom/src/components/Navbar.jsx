import {Link} from "react-router-dom";
import './Navbar.css';
import { FaShoppingCart } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import logo from '../assets/supershop.png';
export  default function Navbar(){
    return(
        <nav className="flex fixed w-screen top-0 left-0 h-24 justify-around 
         align-center  bg-[#084F2D] 
         py-2 pr-1 pl-5">
            <Link to="/"> 
               <img className="object-cover h-full w-50 min-w-40" 
                src={logo}
                 alt="logo"
                 />
            </Link>
            <div className="flex min-w-[500px] w-4xl items-center">
                <input
                className="border h- rounded-l-lg px-4 py-3 min-w-140 w-full bg-white" 
                type="text" 
                placeholder="search"/>
                <button 
                className="px-2 py-4 bg-white rounded-r-lg ">
                    <IoIosSearch className="w-8 hover:cursor-pointer"/>
                </button>
            </div>
            <Link to="/login"> 
               <div className="align-top w-full px-2 py-2 mt-4 flex gap-2 items-center 
               border-2 border-transparent hover:border-white rounded-[3px]
                bg-transparent hover:bg-white
             text-white  hover:text-black  
               transition-all duration-300 hover:scale-105">
                    <CgProfile />
                    <span className="font-sans tracking-wider">LOGIN</span>
               </div> 
            </Link>

            <Link to="/cart"> 
               <div className="align-top w-full px-2 py-2 mt-4 flex gap-2 items-center 
               border-2 border-transparent hover:border-white rounded-[3px]
                bg-transparent hover:bg-white
             text-white  hover:text-black  
               transition-all duration-300 hover:scale-105">
                   <FaShoppingCart className="text-3xl" />
                   <div className="ml-4 mb-3 fixed text-black">2</div>
                    <span className="font-sans tracking-wider">CART</span>  
                    </div>            
            </Link>

        </nav>
    )
}