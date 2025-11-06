import { z } from 'zod';

export const RegisterSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(12, "Password must be at least 12 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});