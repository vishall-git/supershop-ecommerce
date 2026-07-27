import { createContext,  useState } from "react";

export const CartCountContext=createContext();

export default function AppProvide({children}){
    const [count,setCount]=useState(0);

    return(
        <CartCountContext.Provider value={{count,setCount}}>
        {children}
        </CartCountContext.Provider>
    )
}