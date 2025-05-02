export interface Voter {
  aadhaarNumber: string;
  name: string;
  address: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  mobileNumber: string;
  email: string;
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

export interface VoteCommitment {
  electionId: number;
  nullifierHash: string;
  voteCommitment: string;
}

export interface ZKProof {
  proof: any; // TODO: Add proper type from snarkjs
  publicSignals: string[];
} 