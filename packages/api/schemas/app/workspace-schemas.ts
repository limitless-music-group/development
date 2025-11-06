import z from "zod";
import type { User } from '@packages/auth/auth'

export const listWorkspacesSchema = z.object({
  workspaces: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      avatar: z.string(),
    })
  ),
  user: z.custom<User<Record<string, unknown>>>(),
});

export type ListWorkspacesSchema = z.infer<typeof listWorkspacesSchema>;