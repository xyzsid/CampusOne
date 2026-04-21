export type Role = 'admin' | 'teacher';

export type Student = {
  id: string;
  name: string;
  rollNo: number;
  parentEmail: string;
  active: boolean;
  className: string;
};

export type AttendanceRow = {
  studentId: string;
  present: boolean;
};

export type FeeStatus = 'paid' | 'overdue' | 'due_soon';

export type FeeRow = {
  studentId: string;
  studentName: string;
  amount: number;
  status: FeeStatus;
};

export type MessageRow = {
  id: string;
  subject: string;
  recipient: string;
  status: 'delivered' | 'pending' | 'failed';
  timestamp: string;
};
