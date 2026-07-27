import { createContext } from 'react';
import { useState } from 'react';

export const loginUserContext=createContext();

export function LoginProvider({children}){
    const [isLoggined,setIsLoggined] = useState(false);
    return (
        <loginUserContext.Provider value={{isLoggined,setIsLoggined}}>
            {children}
        </loginUserContext.Provider>
    )
}