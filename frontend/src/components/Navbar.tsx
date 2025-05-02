import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onLanguageToggle: () => void;
  currentLanguage: string;
}

const Navbar = ({ onLanguageToggle, currentLanguage }: NavbarProps) => {
  const { t } = useTranslation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            {t('welcome')}
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={onLanguageToggle}
              className="px-4 py-2 rounded-md bg-primary-100 text-primary-700 hover:bg-primary-200 transition-colors"
            >
              {currentLanguage === 'en' ? 'हिंदी' : 'English'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
