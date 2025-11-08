import { createEnv, StandardSchemaV1 } from "@t3-oss/env-core";
import { keys as database } from '@packages/database/keys';
import { keys as auth } from '@packages/auth/keys';


export const env = createEnv({
    extends: [auth(), database()],
    server: {},
    runtimeEnv: {},
     // Called when the schema validation fails.
  onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
    console.error(
      "❌ Invalid environment variables:",
      issues
    );
    throw new Error("Invalid environment variables");
  },
  // Called when server variables are accessed on the client.
  onInvalidAccess: (variable: string) => {
    throw new Error(
      "❌ Attempted to access a server-side environment variable on the client"
    );
  },
})