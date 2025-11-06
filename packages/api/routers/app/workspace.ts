import { o, protectedProcedure } from "../../procedures";
import { z } from 'zod';

export const listWorkspaces = protectedProcedure.route({
  method: "GET",
  path: '/workspace',
  summary: 'List all workspaces',
  tags: ["workspace"]
  })
  .input(z.void())
  .output(z.void())
  .handler( async ({ input }) => {
    console.log(input);
  })