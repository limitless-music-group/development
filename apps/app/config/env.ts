// import { keys as auth } from '@packages/auth/keys';
import { keys as database } from '@packages/database/keys';
import { keys as core } from '@packages/next-config/keys'
import { createEnv } from "@t3-oss/env-nextjs";

export const env = createEnv({
  extends: [database(), core()],
  server: {},
  client: {},
  runtimeEnv: {},
})