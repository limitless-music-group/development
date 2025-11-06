export const urlProtocol = process.env.NODE_ENV === 'production' ? "https" : "http";
export const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
// export const parsedTitle = `${title} | ${applicationName}`;