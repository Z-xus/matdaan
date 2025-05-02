// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Voting is Ownable, ReentrancyGuard {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Election {
        uint256 id;
        string title;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        mapping(uint256 => Candidate) candidates;
        uint256 candidateCount;
        mapping(bytes32 => bool) hasVoted; // nullifier hash => has voted
    }

    mapping(uint256 => Election) public elections;
    uint256 public electionCount;

    event ElectionCreated(uint256 indexed electionId, string title, uint256 startTime, uint256 endTime);
    event VoteCast(uint256 indexed electionId, bytes32 nullifierHash);
    event ElectionEnded(uint256 indexed electionId);

    constructor() Ownable(msg.sender) {}

    function createElection(
        string memory _title,
        uint256 _startTime,
        uint256 _endTime,
        string[] memory _candidateNames
    ) external onlyOwner {
        require(_startTime < _endTime, "Invalid time range");
        require(_candidateNames.length >= 5 && _candidateNames.length <= 10, "Invalid candidate count");

        uint256 electionId = electionCount++;
        Election storage election = elections[electionId];
        election.id = electionId;
        election.title = _title;
        election.startTime = _startTime;
        election.endTime = _endTime;
        election.isActive = true;

        for (uint256 i = 0; i < _candidateNames.length; i++) {
            election.candidates[i] = Candidate({
                id: i,
                name: _candidateNames[i],
                voteCount: 0
            });
        }
        election.candidateCount = _candidateNames.length;

        emit ElectionCreated(electionId, _title, _startTime, _endTime);
    }

    function castVote(
        uint256 _electionId,
        bytes32 _nullifierHash,
        bytes32 _voteCommitment
    ) external nonReentrant {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election not active");
        require(block.timestamp >= election.startTime, "Election not started");
        require(block.timestamp <= election.endTime, "Election ended");
        require(!election.hasVoted[_nullifierHash], "Already voted");

        // TODO: Add ZKP verification here
        // For MVP, we'll just record the vote commitment
        election.hasVoted[_nullifierHash] = true;

        emit VoteCast(_electionId, _nullifierHash);
    }

    function endElection(uint256 _electionId) external onlyOwner {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election already ended");
        require(block.timestamp > election.endTime, "Election still active");

        election.isActive = false;
        emit ElectionEnded(_electionId);
    }

    function getElectionDetails(uint256 _electionId) external view returns (
        string memory title,
        uint256 startTime,
        uint256 endTime,
        bool isActive,
        uint256 candidateCount
    ) {
        Election storage election = elections[_electionId];
        return (
            election.title,
            election.startTime,
            election.endTime,
            election.isActive,
            election.candidateCount
        );
    }

    function getCandidate(uint256 _electionId, uint256 _candidateId) external view returns (
        uint256 id,
        string memory name,
        uint256 voteCount
    ) {
        Election storage election = elections[_electionId];
        Candidate storage candidate = election.candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.voteCount);
    }
} 