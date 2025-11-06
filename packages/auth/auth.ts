import { nextCookies } from 'better-auth/next-js';
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal } from "@polar-sh/better-auth";
import { polarClient } from "./lib/payments";
import { database } from "@packages/database";
import { keys } from './keys';
import { saltAndHashPassword, verifyPassword } from './lib/password';

export const auth = betterAuth<BetterAuthOptions>({
	secret: keys().BETTER_AUTH_SECRET,
	database: prismaAdapter(database, {
		provider: "postgresql",
	}),
	trustedOrigins: [process.env.CORS_ORIGIN || ""],
	emailAndPassword: {
		enabled: true,
		password: {
			hash: saltAndHashPassword,
			verify: verifyPassword,
		}
	},
	plugins: [
		polar({
			client: polarClient,
			createCustomerOnSignUp: true,
			enableCustomerPortal: true,
			use: [
				checkout({
					products: [
						{
							productId: "your-product-id",
							slug: "pro",
						},
					],
					successUrl: process.env.POLAR_SUCCESS_URL,
					authenticatedUsersOnly: true,
				}),
				portal(),
			],
		}),
    nextCookies()
  ],
});
