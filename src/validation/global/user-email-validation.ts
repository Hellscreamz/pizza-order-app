import { z } from 'zod';

export const UserEmailValidation = z.object({
  email: z.string().email(),
});
