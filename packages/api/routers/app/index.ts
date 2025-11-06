import { protectedProcedure } from "@packages/api/procedures";
import { listWorkspaces } from "./workspace";

export const appRouter = {
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	workspace: {
		list: listWorkspaces,
	}
};