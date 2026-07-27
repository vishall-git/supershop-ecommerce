import {z} from "zod";

const loginSchema = z.object({
    email:z.email("Email is invalid"),
    password:z.string().min(5,"password is too small").max(20,"password is very large")
})

export default loginSchema;