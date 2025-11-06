import { listWorkspacesSchema } from "@/schemas/app/workspace-schemas";
import { o, protectedProcedure } from "@/procedures";
import { z } from 'zod';

export const listWorkspaces = protectedProcedure.route({
  method: "GET",
  path: '/workspace',
  summary: 'List all workspaces',
  tags: ["workspace"]
  })
  .input(z.void())
  .output(listWorkspacesSchema)
  .handler( async ({ input }) => {
    console.log(input);
  })