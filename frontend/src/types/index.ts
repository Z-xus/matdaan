export interface Voter {
  name: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
}

export interface Election {
  id: number;
  title: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
  candidates: Candidate[];
}

export interface Candidate {
  id: number;
  name: string;
  voteCount: number;
}

export interface VoteReceipt {
  electionId: number;
  nullifierHash: string;
  timestamp: number;
} 