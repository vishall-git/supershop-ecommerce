import {z} from 'zod';

const resetPasswordSchema=z.object({
    password:z.string().min(6,"password must be strong"),
    confirmPassword:z.string()
}).refine((data)=>data.password===data.confirmPassword,{
    message:"password should be same",
    path:["confirmPassword"]
})

export default resetPasswordSchema;