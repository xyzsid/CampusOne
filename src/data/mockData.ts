import type { AttendanceRow, FeeRow, MessageRow, Student } from '../types/models';

export const students: Student[] = [
  { id: 's1', name: 'Aarav Singh', rollNo: 1, parentEmail: 'aarav@parent.com', active: true, className: 'Nursery A' },
  { id: 's2', name: 'Bhavna Patel', rollNo: 2, parentEmail: 'bhavna@parent.com', active: true, className: 'Nursery A' },
  { id: 's3', name: 'Charan Kumar', rollNo: 3, parentEmail: 'charan@parent.com', active: false, className: 'Nursery A' },
];

export const attendance: AttendanceRow[] = students.map((student) => ({ studentId: student.id, present: true }));

export const fees: FeeRow[] = [
  { studentId: 's1', studentName: 'Aarav Singh', amount: 2500, status: 'paid' },
  { studentId: 's2', studentName: 'Bhavna Patel', amount: 2500, status: 'due_soon' },
  { studentId: 's3', studentName: 'Charan Kumar', amount: 2500, status: 'overdue' },
];

export const messages: MessageRow[] = [
  { id: 'm1', subject: 'Attendance Alert', recipient: 'All Parents', status: 'delivered', timestamp: '10:30 AM' },
  { id: 'm2', subject: 'Fee Reminder', recipient: 'Bhavna Parent', status: 'pending', timestamp: '09:00 AM' },
  { id: 'm3', subject: 'Summer Camp Update', recipient: 'All Parents', status: 'delivered', timestamp: 'Yesterday' },
  { id: 'm4', subject: 'Holiday Notice', recipient: 'Nursery A', status: 'delivered', timestamp: '2 days ago' },
  { id: 'm5', subject: 'Library Renewal', recipient: 'Charan Parent', status: 'failed', timestamp: '1 week ago' },
  { id: 'm6', subject: 'Monthly Newsletter', recipient: 'All Parents', status: 'delivered', timestamp: '2 weeks ago' },
  { id: 'm7', subject: 'Sports Day Photos', recipient: 'All parents', status: 'delivered', timestamp: '3 weeks ago' },
];
