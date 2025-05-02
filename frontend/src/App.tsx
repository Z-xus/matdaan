import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';

// Components
import Navbar from './components/Navbar';
import AadhaarVerification from './pages/AadhaarVerification';
import Elections from './pages/Elections';
import ElectionDetails from './pages/ElectionDetails';
import VoteVerification from './pages/VoteVerification';

function App() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'hi' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar onLanguageToggle={toggleLanguage} currentLanguage={language} />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<AadhaarVerification />} />
            <Route path="/elections" element={<Elections />} />
            <Route path="/elections/:id" element={<ElectionDetails />} />
            <Route path="/verify-vote/:nullifierHash" element={<VoteVerification />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 