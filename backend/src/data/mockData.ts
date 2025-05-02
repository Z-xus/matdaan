import { Voter, Election } from '../types';

export const mockVoters: Voter[] = [
  {
    aadhaarNumber: '123456789012',
    name: 'Rahul Sharma',
    address: '123 Main St, Mumbai, Maharashtra',
    gender: 'male',
    dateOfBirth: '1990-01-01',
    mobileNumber: '9876543210',
    email: 'rahul@example.com'
  },
  {
    aadhaarNumber: '234567890123',
    name: 'Priya Patel',
    address: '456 Park Ave, Delhi, Delhi',
    gender: 'female',
    dateOfBirth: '1992-05-15',
    mobileNumber: '9876543211',
    email: 'priya@example.com'
  },
  {
    aadhaarNumber: '345678901234',
    name: 'Amit Kumar',
    address: '789 Lake View, Bangalore, Karnataka',
    gender: 'male',
    dateOfBirth: '1988-12-25',
    mobileNumber: '9876543212',
    email: 'amit@example.com'
  }
];

export const mockElections: Election[] = [
  {
    id: 1,
    title: 'Student Council Election 2024',
    startTime: Math.floor(Date.now() / 1000),
    endTime: Math.floor(Date.now() / 1000) + 86400, // 24 hours from now
    isActive: true,
    candidates: [
      { id: 1, name: 'Arjun Singh', voteCount: 0 },
      { id: 2, name: 'Neha Gupta', voteCount: 0 },
      { id: 3, name: 'Vikram Mehta', voteCount: 0 },
      { id: 4, name: 'Ananya Reddy', voteCount: 0 },
      { id: 5, name: 'Rajesh Kumar', voteCount: 0 }
    ]
  },
  {
    id: 2,
    title: 'Housing Society Election 2024',
    startTime: Math.floor(Date.now() / 1000) + 86400,
    endTime: Math.floor(Date.now() / 1000) + 172800, // 48 hours from now
    isActive: false,
    candidates: [
      { id: 1, name: 'Sunil Verma', voteCount: 0 },
      { id: 2, name: 'Meera Kapoor', voteCount: 0 },
      { id: 3, name: 'Ravi Shankar', voteCount: 0 },
      { id: 4, name: 'Pooja Sharma', voteCount: 0 },
      { id: 5, name: 'Kiran Patel', voteCount: 0 },
      { id: 6, name: 'Suresh Kumar', voteCount: 0 }
    ]
  }
]; 