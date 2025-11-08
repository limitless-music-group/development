import 'dotenv/config';
import { OpenAPIHandler } from '@orpc/openapi/fetch';
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import { RPCHandler } from '@orpc/server/fetch';
import { onError } from '@orpc/server';
import { createContext } from '@packages/api/lib/context';
import { router } from '@packages/api/routers/index';
import { auth } from '@packages/auth';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { env } from './env';

const app = new Hono();

app.use(logger());
app.use(
    "/*",
    cors({
        origin: env().CORS_ORIGIN,
        allowMethods: ["GET", "POST", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }),
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

export const apiHandler = new OpenAPIHandler(router, {
    plugins: [
        new OpenAPIReferencePlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()],
        }),
    ],
    interceptors: [
        onError((error) => {
            // TODO: Replace with @packages/observability log function
            console.error(error)
        }),
    ],
});

export const rpcHandler = new RPCHandler(router, {
    interceptors: [
        onError((error) => {
            console.error(error)
        }),
    ],
})

app.use("/*", async (c, next) => {
    const context = await createContext({ context: c });

    const rpcResult = await rpcHandler.handle(c.req.raw, {
        prefix: '/rpc',
        context: context,
    });
    if (rpcResult.matched) {
        return c.newResponse(rpcResult.response.body, rpcResult.response);
    }

    const apiResult = await apiHandler.handle(c.req.raw, {
        prefix: '/api-reference',
        context: context,
    });

    if (apiResult.matched) {
        return c.newResponse(apiResult.response.body, apiResult.response);
    }

    await next();
})

app.get('/', (c) => {
    return c.text("OK")
});

import { serve } from '@hono/node-server';
serve(
    {
        fetch: app.fetch,
        port: 3002,
    },
    (info) => {
        //*There is no need to change this to the log function as well because its just printing info for us*//
        console.log(`API Server is running on http://localhost:${info.port}`);
    },
)