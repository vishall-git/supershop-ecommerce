import { createContext, useState } from "react";

export const checkoutContext=createContext();

export function PaymentProvider({children}){
    const [payment,setPayment]=useState(false);

    return(
        <checkoutContext.Provider value={{payment,setPayment}}>
        {children}
        </checkoutContext.Provider>
    )
}