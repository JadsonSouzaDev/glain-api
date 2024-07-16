enum RecordType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export class Record {
  id: string;
  type: RecordType;
  category: string;
  description: string;
  amount: number;
  effectiveAt: Date;
  createdAt: Date;
  updatedAt: Date;
  active: boolean;
}
