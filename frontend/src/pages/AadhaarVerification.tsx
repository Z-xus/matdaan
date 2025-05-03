import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LogInWithAnonAadhaar, useAnonAadhaar, AnonAadhaarProof } from "@anon-aadhaar/react";

const AadhaarVerification = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Use Anon Aadhaar hook to get the authentication status
  const [anonAadhaar] = useAnonAadhaar();

  // Generate a nullifier seed - in production you should use a secure method
  // This is just for demonstration purposes
  const nullifierSeed = 123456789; // In production, use crypto.randomBytes as shown in the docs

  // Monitor Anon Aadhaar status
  useEffect(() => {
    console.log("Anon Aadhaar status:", anonAadhaar.status);
    
    // When user is successfully logged in
    if (anonAadhaar.status === "logged-in") {
      handleSuccessfulVerification();
    }
  }, [anonAadhaar]);

  const handleSuccessfulVerification = async () => {
    try {
      setLoading(true);
      
      // Here you would typically send the proof to your backend
      // For demo purposes, we'll just simulate successful verification
      
      // Store verified voter info in localStorage
      // In a real app, you might want to store a JWT token instead
      localStorage.setItem('verifiedVoter', JSON.stringify({
        isVerified: true,
        timestamp: Date.now()
      }));
      
      // Navigate to elections page
      navigate('/elections');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t('verifyAadhaar')}
        </h1>

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              {t('anonAadhaarDescription')}
            </p>
            
            {/* Anon Aadhaar login button */}
            <div className="flex justify-center mb-4">
              <LogInWithAnonAadhaar 
                nullifierSeed={nullifierSeed}
                fieldsToReveal={["revealAgeAbove18"]} // Optional: only verify if user is above 18
              />
            </div>
            
            {/* Display status */}
            <div className="text-sm">
              {anonAadhaar.status === "logged-in" ? (
                <p className="text-green-600">{t('verificationSuccessful')}</p>
              ) : anonAadhaar.status === "logging-in" ? (
                <p className="text-blue-600">{t('verifying')}</p>
              ) : (
                <p className="text-gray-600">{t('notVerified')}</p>
              )}
            </div>
          </div>

          {/* Display proof information when logged in */}
          {anonAadhaar.status === "logged-in" && (
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm font-medium text-gray-700 mb-2">
                {t('proofGenerated')}
              </p>
              <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerification;