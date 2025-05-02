import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Matdaan',
      verifyAadhaar: 'Verify Aadhaar',
      enterAadhaar: 'Enter your Aadhaar number',
      verify: 'Verify',
      activeElections: 'Active Elections',
      vote: 'Vote',
      verifyVote: 'Verify Vote',
      electionDetails: 'Election Details',
      candidates: 'Candidates',
      submitVote: 'Submit Vote',
      voteReceipt: 'Vote Receipt',
      back: 'Back',
      next: 'Next',
      error: 'Error',
      success: 'Success',
      loading: 'Loading...'
    }
  },
  hi: {
    translation: {
      welcome: 'मतदान में आपका स्वागत है',
      verifyAadhaar: 'आधार सत्यापित करें',
      enterAadhaar: 'अपना आधार नंबर दर्ज करें',
      verify: 'सत्यापित करें',
      activeElections: 'सक्रिय चुनाव',
      vote: 'मतदान करें',
      verifyVote: 'मतदान सत्यापित करें',
      electionDetails: 'चुनाव विवरण',
      candidates: 'उम्मीदवार',
      submitVote: 'मतदान जमा करें',
      voteReceipt: 'मतदान रसीद',
      back: 'वापस',
      next: 'अगला',
      error: 'त्रुटि',
      success: 'सफल',
      loading: 'लोड हो रहा है...'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 