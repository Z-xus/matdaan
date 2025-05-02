import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Election } from '../types';

const Elections = () => {
  const { t } = useTranslation();
  const [elections, setElections] = useState<Election[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch('/api/elections');
        if (!response.ok) {
          throw new Error('Failed to fetch elections');
        }
        const data = await response.json();
        setElections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch elections');
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

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
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {t('activeElections')}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {elections.map((election) => (
          <Link
            key={election.id}
            to={`/elections/${election.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {election.title}
              </h2>
              <div className="text-sm text-gray-600">
                <p>
                  {new Date(election.startTime * 1000).toLocaleDateString()} -{' '}
                  {new Date(election.endTime * 1000).toLocaleDateString()}
                </p>
                <p className="mt-2">
                  {election.candidates.length} {t('candidates')}
                </p>
              </div>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {t('vote')}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {elections.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          {t('noActiveElections')}
        </div>
      )}
    </div>
  );
};

export default Elections; 