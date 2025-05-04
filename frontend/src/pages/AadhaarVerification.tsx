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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter text-gray-900">
            {t('verifyAadhaar')}
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            {t('anonAadhaarDescription')}
          </p>
        </div>

        <div className="space-y-6">
          {/* Anon Aadhaar login button */}
          <div className="flex justify-center">
            <LogInWithAnonAadhaar 
              nullifierSeed={nullifierSeed}
              fieldsToReveal={["revealAgeAbove18"]} // Optional: only verify if user is above 18
            />
          </div>
          
          {/* Display status */}
          <div className="flex justify-center">
            {anonAadhaar.status === "logged-in" ? (
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-50 text-green-700">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t('verificationSuccessful')}
              </div>
            ) : anonAadhaar.status === "logging-in" ? (
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {t('verifying')}
              </div>
            ) : (
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gray-50 text-gray-600">
                {t('notVerified')}
              </div>
            )}
          </div>

          {/* Display proof information when logged in */}
          {anonAadhaar.status === "logged-in" && (
            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6">
              <p className="text-sm font-medium text-gray-900 mb-4">
                {t('proofGenerated')}
              </p>
              <div className="overflow-hidden rounded-lg border border-gray-100">
                <AnonAadhaarProof code={JSON.stringify(anonAadhaar.pcd, null, 2)} />
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-100">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerification;