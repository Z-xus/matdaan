import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Election, Candidate } from '../types';

const ElectionDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [election, setElection] = useState<Election | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [voting, setVoting] = useState(false);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const response = await fetch(`/api/elections/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch election details');
        }
        const data = await response.json();
        setElection(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch election details');
      } finally {
        setLoading(false);
      }
    };

    fetchElection();
  }, [id]);

  const handleVote = async () => {
    if (!selectedCandidate || !election) return;

    setVoting(true);
    try {
      // In a real system, we would:
      // 1. Generate ZKP
      // 2. Submit vote to blockchain
      // For MVP, we'll just simulate the process
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          electionId: election.id,
          candidateId: selectedCandidate,
          // TODO: Add proper ZKP generation
          nullifierHash: '0x' + Math.random().toString(16).slice(2),
          voteCommitment: '0x' + Math.random().toString(16).slice(2),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit vote');
      }

      const data = await response.json();
      navigate(`/verify-vote/${data.receipt.nullifierHash}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit vote');
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  if (error || !election) {
    return (
      <div className="text-center text-red-600">
        {error || 'Election not found'}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {election.title}
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {t('candidates')}
        </h2>

        <div className="space-y-4">
          {election.candidates.map((candidate: Candidate) => (
            <div
              key={candidate.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedCandidate === candidate.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              }`}
              onClick={() => setSelectedCandidate(candidate.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {candidate.name}
                  </h3>
                </div>
                {selectedCandidate === candidate.id && (
                  <div className="text-primary-600">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={handleVote}
            disabled={!selectedCandidate || voting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {voting ? t('loading') : t('submitVote')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectionDetails; 