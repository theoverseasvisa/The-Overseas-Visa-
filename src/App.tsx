import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import CountryExplorer from './components/CountryExplorer';
import EligibilityEvaluator from './components/EligibilityEvaluator';
import FeedbackSection from './components/FeedbackSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import WhatsAppDrawer from './components/WhatsAppDrawer';

export default function App() {
  const [preselectedCountry, setPreselectedCountry] = useState<string | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCountry = (countryName: string) => {
    setPreselectedCountry(countryName);
    scrollToSection('evaluator');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-crimson-200 selection:text-crimson-900" id="main-app-container">
      {/* Header Navigation link bar */}
      <Navbar onEvaluateClick={() => scrollToSection('evaluator')} />

      {/* Main Core Section Columns */}
      <main className="flex-grow">
        {/* HERO SHOWCASE PANEL */}
        <Hero 
          onEvaluateClick={() => scrollToSection('evaluator')} 
          onExploreClick={() => scrollToSection('countries')} 
        />

        {/* SERVICES OFFERINGS ROW */}
        <Services />

        {/* TARGET COUNTRY DIRECTORY FILTER */}
        <CountryExplorer onSelectCountry={handleSelectCountry} />

        {/* ONBOARDING EVALUATOR REGULATORY FORM */}
        <EligibilityEvaluator 
          preselectedCountryName={preselectedCountry}
          resetPreselectedCountry={() => setPreselectedCountry(null)}
        />

        {/* IMMIGRANT TESTIMONIAL FEEDBACK STORIES */}
        <FeedbackSection />

        {/* FREQUENTLY ANSWERED LEGAL INQUIRIES */}
        <FaqSection />
      </main>

      {/* COMPLIANT REGULATORY FOOTER AND MAPS */}
      <Footer />

      {/* FLOATING WHATSAPP CHAT DRAWER */}
      <WhatsAppDrawer />
    </div>
  );
}
