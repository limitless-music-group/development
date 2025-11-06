import type { RouterClient } from "@orpc/server";
import { appRouter } from "./app";
import { publicProcedure } from "../procedures";

export const router = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	app: appRouter,
};
export type APIRouter = typeof router;
export type APIRouterClient = RouterClient<typeof router>;
