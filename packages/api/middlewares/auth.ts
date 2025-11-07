import type { AuthenticatedContext, PublicContext } from "@/types";
import { ORPCError } from "@orpc/server";
import type { MiddlewareNextFn } from "@orpc/server";

export const authMiddleware = async ({
	context,
	next,
} : {
	context: PublicContext
	next: MiddlewareNextFn<unknown>
}) => {
	if (!context.session || !context.user) {
		throw new ORPCError('UNAUTHORIZED');
	}

	return next({
		context: {
			...context,
			session: context.session,
			user: context.user
		}
	})
}