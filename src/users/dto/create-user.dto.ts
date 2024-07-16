import { z } from 'zod';

export class CreateUserDto {
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
  cnpj?: string;
  branchOfActivity?: string;
  companyName?: string;
  threadId?: string;
}

export const createUserSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  cnpj: z.string().optional(),
  branchOfActivity: z.string().optional(),
  companyName: z.string().optional(),
  threadId: z.string().optional(),
});
