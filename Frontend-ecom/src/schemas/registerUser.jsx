import { z } from "zod";

const registerSchema = z.object({
    username: z.string().min(3, "enter a valid user name").max(10, "username is too large"),
    email: z.email("Email is invalid"),
    password: z.string().min(5, "password is too small").max(20, "password is very large")
})

export default registerSchema;