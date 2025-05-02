import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';

const VoteVerification = () => {
  const { t } = useTranslation();
  const { nullifierHash } = useParams<{ nullifierHash: string }>();
  const [verification, setVerification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyVote = async () => {
      try {
        const response = await fetch(`/api/verify-vote/${nullifierHash}`);
        if (!response.ok) {
          throw new Error('Failed to verify vote');
        }
        const data = await response.json();
        setVerification(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to verify vote');
      } finally {
        setLoading(false);
      }
    };

    verifyVote();
  }, [nullifierHash]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t('voteReceipt')}
        </h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm font-medium text-gray-500">
              {t('verificationStatus')}
            </h2>
            <p className="mt-1 text-lg text-green-600">
              {t('voteVerified')}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">
              {t('electionId')}
            </h2>
            <p className="mt-1 text-lg text-gray-900">
              {verification?.electionId}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">
              {t('timestamp')}
            </h2>
            <p className="mt-1 text-lg text-gray-900">
              {new Date(verification?.timestamp).toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">
              {t('receiptHash')}
            </h2>
            <p className="mt-1 text-sm font-mono text-gray-900 break-all">
              {nullifierHash}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Link
            to="/elections"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {t('backToElections')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VoteVerification; 