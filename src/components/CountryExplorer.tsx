import { useState, useMemo } from 'react';
import { Search, Timer, Award, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COUNTRIES } from '../data';
import { CountryData } from '../types';

interface CountryExplorerProps {
  onSelectCountry: (countryName: string) => void;
}

export default function CountryExplorer({ onSelectCountry }: CountryExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Europe' | 'Americas' | 'APAC'>('All');
  const [expandedCountry, setExpandedCountry] = useState<string | null>(null);

  const tabs: ('All' | 'Europe' | 'Americas' | 'APAC')[] = ['All', 'Europe', 'Americas', 'APAC'];

  // Filter countries by searchQuery AND activeTab
  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            country.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            country.topVisaType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTab = activeTab === 'All' || country.region === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchQuery, activeTab]);

  const toggleRequirements = (id: string) => {
    if (expandedCountry === id) {
      setExpandedCountry(null);
    } else {
      setExpandedCountry(id);
    }
  };

  return (
    <section id="countries" className="py-20 md:py-28 bg-stone-50/50 relative border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-crimson-500 uppercase">
            Global Destination Portfolios
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Explore Visa Frameworks by Nation
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Select an international continent, filter specific processing requirements, and instantly verify your preliminary success potential.
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/60 max-w-5xl mx-auto mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex overflow-x-auto gap-1 pb-2 md:pb-0 scrollbar-none" id="country-region-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'bg-crimson-500 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
                id={`tab-${tab.toLowerCase()}`}
              >
                {tab === 'All' ? 'All Continents' : tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search country, visa type or pathways..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 text-stone-900 pl-10 pr-4 py-2.5 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-medium"
              id="country-search-input"
            />
          </div>
        </div>

        {/* Countries Grid */}
        <AnimatePresence mode="popLayout">
          {filteredCountries.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="country-cards-grid"
            >
              {filteredCountries.map((country: CountryData) => {
                const isExpanded = expandedCountry === country.id;
                return (
                  <motion.div
                    layout
                    key={country.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.25 }}
                    className="cty-card bg-white rounded-2xl border border-stone-200/80 shadow-sm hover:shadow-md hover:border-crimson-500/20 transition-all overflow-hidden flex flex-col group justify-between"
                    id={`cty-card-${country.id}`}
                  >
                    {/* Top banner / flag */}
                    <div>
                      <div className="bg-stone-50 border-b border-stone-100 p-5 flex justify-between items-center relative overflow-hidden">
                        <div className="flex items-center space-x-3.5 z-10">
                          <span className="text-3xl filter drop-shadow-sm select-none" role="img" aria-label={country.name}>
                            {country.flag}
                          </span>
                          <div>
                            <h3 className="font-serif font-bold text-lg text-stone-900 tracking-tight group-hover:text-crimson-500 transition-colors">
                              {country.name}
                            </h3>
                            <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">
                              {country.region} Region
                            </span>
                          </div>
                        </div>

                        {/* Success Rate Oval */}
                        <div className="text-right z-10">
                          <span className="block text-xl font-black font-mono text-emerald-600 leading-none">
                            {country.successRate}%
                          </span>
                          <span className="text-[9px] uppercase font-bold text-stone-400">
                            Success Metric
                          </span>
                        </div>

                        {/* Light design accent */}
                        <div className="absolute right-0 bottom-0 top-0 w-24 bg-gradient-to-l from-stone-100/50 to-transparent pointer-events-none"></div>
                      </div>

                      {/* Content Body */}
                      <div className="p-6 space-y-4">
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                          {country.description}
                        </p>

                        {/* Key facts tags */}
                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-stone-50 border border-stone-100 rounded-lg p-2.5 flex items-center space-x-2.5">
                            <Timer className="h-4 w-4 text-amber-500 flex-shrink-0" />
                            <div>
                              <span className="block text-[8px] uppercase font-bold text-stone-400 leading-none">Decisions In</span>
                              <span className="text-xs font-semibold text-stone-700 leading-none">{country.processingTime}</span>
                            </div>
                          </div>

                          <div className="bg-stone-50 border border-stone-100 rounded-lg p-2.5 flex items-center space-x-2.5">
                            <GraduationCap className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            <div>
                              <span className="block text-[8px] uppercase font-bold text-stone-400 leading-none">Min Language</span>
                              <span className="text-xs font-semibold text-stone-700 leading-none whitespace-nowrap">{country.minLanguageScore.split(' ')[0]} {country.minLanguageScore.split(' ')[1] || ''}</span>
                            </div>
                          </div>
                        </div>

                        {/* Top Visa Route banner */}
                        <div className="bg-crimson-50/50 border border-crimson-100/40 rounded-xl p-3 flex justify-between items-center text-xs">
                          <span className="text-stone-500 font-medium">Top Visa stream:</span>
                          <span className="font-bold text-crimson-700 font-mono tracking-tight">{country.topVisaType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable requirements section & action buttons */}
                    <div className="border-t border-stone-100 p-6 pt-4 space-y-4 bg-stone-50/20">
                      {/* Requirements expander trigger */}
                      <button
                        onClick={() => toggleRequirements(country.id)}
                        className="w-full text-left text-xs font-bold text-stone-500 hover:text-crimson-500 transition-colors flex justify-between items-center"
                        id={`cty-expand-reqs-${country.id}`}
                      >
                        <span>{isExpanded ? 'Hide Prerequisites & Filing Details' : 'View Filing Requirements'}</span>
                        <span className="text-stone-400 group-hover:text-crimson-500 transition-colors">
                          {isExpanded ? '▲' : '▼'}
                        </span>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden space-y-2 pr-1"
                          >
                            <ul className="space-y-1.5 pt-1">
                              {country.requirements.map((req, ridx) => (
                                <li key={ridx} className="flex items-start space-x-2 text-[11px] text-stone-600 leading-relaxed">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-crimson-500 flex-shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="p-2 border border-blue-100 bg-blue-50/40 rounded-lg text-[10px] text-blue-800 flex items-start space-x-1.5 leading-snug">
                              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 flex-shrink-0" />
                              <span>Evaluation requires authentic documents reflecting correct profile statements.</span>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Main select mapping trigger */}
                      <button
                        onClick={() => onSelectCountry(country.name)}
                        className="w-full bg-white hover:bg-crimson-500 text-stone-700 hover:text-white border border-stone-200 hover:border-crimson-500 text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
                        id={`cty-evaluate-btn-${country.id}`}
                      >
                        <span>Select For Online Eligibility Assessor</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            /* Fallback view if empty */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white border border-stone-200/60 rounded-3xl max-w-lg mx-auto shadow-sm space-y-5"
              id="no-countries-fallback"
            >
              <div className="bg-crimson-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-6 w-6 text-crimson-500" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif font-bold text-stone-900 text-xl">Destination Not Found</h3>
                <p className="text-stone-500 text-sm max-w-sm mx-auto">
                  We currently support 6 major regions. Adjust your search keywords or reach out directly via WhatsApp for custom country programs.
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('All');
                }}
                className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
                id="reset-search-btn"
              >
                Reset Filter Settings
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
