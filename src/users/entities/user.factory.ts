import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from './user.entity';

export const createToEntity = (create: CreateUserDto): User => {
  const user = new User();
  user.name = create.name;
  user.surname = create.surname;
  user.email = create.email;
  user.whatsapp = create.whatsapp;
  user.cnpj = create.cnpj;
  user.branchOfActivity = create.branchOfActivity;
  user.companyName = create.companyName;
  user.threadId = create.threadId;
  user.createdAt = new Date();
  user.updatedAt = new Date();
  user.active = true;
  return user;
};

export const updateToEntity = (update: UpdateUserDto, user: User): User => {
  user.name = update.name || user.name;
  user.surname = update.surname || user.surname;
  user.cnpj = update.cnpj || user.cnpj;
  user.branchOfActivity = update.branchOfActivity || user.branchOfActivity;
  user.companyName = update.companyName || user.companyName;
  user.threadId = update.threadId || user.threadId;
  return user;
};
