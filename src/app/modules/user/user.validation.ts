import { z } from "zod";

const createuserValidationSchema = z.object({
  body: z.object({
    name:z.string(),
    email:z.string().email(),
    password: z.string().min(6).max(20),
    role:z.enum(['admin','lawyer','client'])
  })
})

export const UserValidation = {
  createuserValidationSchema,
}