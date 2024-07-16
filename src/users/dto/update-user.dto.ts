import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { z } from 'zod';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export const updateUserSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  cnpj: z.string().optional(),
  branchOfActivity: z.string().optional(),
  companyName: z.string().optional(),
  threadId: z.string().optional(),
});
