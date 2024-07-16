import { User } from '../entities/user.entity';

export class ListUserDto {
  id: string;
  name: string;
  surname: string;
  email: string;
  whatsapp: string;
  cnpj?: string;
  branchOfActivity?: string;
  companyName?: string;
  threadId?: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.whatsapp = user.whatsapp;
    this.cnpj = user.cnpj;
    this.branchOfActivity = user.branchOfActivity;
    this.companyName = user.companyName;
    this.threadId = user.threadId;
  }
}
