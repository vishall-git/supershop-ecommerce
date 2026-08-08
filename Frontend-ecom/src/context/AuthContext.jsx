import { createContext } from 'react';
import { useState } from 'react';

export const loginUserContext=createContext();

export function LoginProvider({children}){
    const [isLoggined,setIsLoggined] = useState(false);
    const [emailToResetPass,setEmailToReset]=useState('')
    return (
        <loginUserContext.Provider value={{isLoggined,setIsLoggined,emailToResetPass,setEmailToReset}}>
            {children}
        </loginUserContext.Provider>
    )
}