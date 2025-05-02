import express from 'express';
import cors from 'cors';
import { ethers } from 'ethers';
import { mockVoters, mockElections } from './data/mockData.js';
import { Voter, VoteCommitment } from './types/index.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Mock Aadhaar verification
app.post('/api/verify-aadhaar', (req, res) => {
  const { aadhaarNumber } = req.body;
  const voter = mockVoters.find(v => v.aadhaarNumber === aadhaarNumber);
  
  if (!voter) {
    return res.status(404).json({ error: 'Voter not found' });
  }

  // In a real system, we would verify with UIDAI API
  // For MVP, we'll just return the voter data
  res.json({ 
    verified: true,
    voter: {
      name: voter.name,
      address: voter.address,
      gender: voter.gender,
      dateOfBirth: voter.dateOfBirth
    }
  });
});

// Get active elections
app.get('/api/elections', (req, res) => {
  const activeElections = mockElections.filter(e => e.isActive);
  res.json(activeElections);
});

// Get election details
app.get('/api/elections/:id', (req, res) => {
  const election = mockElections.find(e => e.id === parseInt(req.params.id));
  if (!election) {
    return res.status(404).json({ error: 'Election not found' });
  }
  res.json(election);
});

// Submit vote
app.post('/api/vote', async (req, res) => {
  const { electionId, nullifierHash, voteCommitment } = req.body as VoteCommitment;

  // In a real system, we would:
  // 1. Verify the ZKP
  // 2. Submit the vote to the blockchain
  // For MVP, we'll just simulate the process

  try {
    // Simulate blockchain interaction
    const provider = new ethers.JsonRpcProvider(process.env.HARDHAT_URL || 'http://localhost:8545');
    // TODO: Add contract interaction here

    res.json({ 
      success: true,
      message: 'Vote recorded successfully',
      receipt: {
        electionId,
        nullifierHash,
        timestamp: Date.now()
      }
    });
  } catch (error) {
    console.error('Error submitting vote:', error);
    res.status(500).json({ error: 'Failed to submit vote' });
  }
});

// Verify vote
app.get('/api/verify-vote/:nullifierHash', (req, res) => {
  const { nullifierHash } = req.params;
  
  // In a real system, we would check the blockchain
  // For MVP, we'll just return a mock response
  res.json({
    verified: true,
    electionId: 1,
    timestamp: Date.now()
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 