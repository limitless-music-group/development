import { parseError } from '@packages/observability/error';
import { toast } from 'sonner';
export const urlProtocol = process.env.NODE_ENV === 'production' ? "https" : "http";
export const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
// export const parsedTitle = `${title} | ${applicationName}`;
export const handleError = (error: unknown): void => {
  const message = parseError(error);
  toast.error(message);
}
