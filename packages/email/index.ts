import { keys } from './keys';
import { Resend } from 'resend';

export const resend = new Resend(keys().RESEND_TOKEN);