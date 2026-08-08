import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email"),
  otp: z.string().length(6, "OTP must be 6 digits").optional()
});

export default forgotPasswordSchema;