import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, Check, HelpCircle, FileText, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FaqItem {
  id: string;
  category: 'General' | 'PR' | 'Study' | 'Work';
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'General' | 'PR' | 'Study' | 'Work'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'General',
      question: 'What is the difference between General and Academic English Tests (IELTS/PTE)?',
      answer: 'The General Training test is strictly utilized for immigration, permanent residency (PR), and general work visa streams in countries like Canada, Australia, and the UK. The Academic test is required for high-tier academic admissions at designated universities, colleges, and postgraduate professional programs.'
    },
    {
      id: 'faq-2',
      category: 'PR',
      question: 'How does the Canada Express Entry points system (CRS) calculate my scoring matrix?',
      answer: 'The Comprehensive Ranking System (CRS) ranks profiles based on dynamic factors including Age, Education Level, Official Language Proficiency (IELTS/CELPIP/TEF tests), Foreign/Canadian Work Experience, and Spouse contributions. Additional chunks of points are granted for Provincial Nominations (PNP), legal Canadian study history, or pre-arranged jobs.'
    },
    {
      id: 'faq-3',
      category: 'Work',
      question: 'What is the Germany Opportunity Card (Chancenkarte) and who qualifies for filing?',
      answer: 'The Opportunity Card is a points-based visa allowing qualified professionals with recognized degrees or vocational training to reside in Germany for up to one year to secure native employment. Qualification requires scoring at least 6 points calculated on degree equivalence, language skills (English/German), age margins, and previous German ties.'
    },
    {
      id: 'faq-4',
      category: 'General',
      question: 'Does "The Overseas Visa" guarantee successful visa approvals?',
      answer: 'Under statutory laws (including the College of Immigration and Citizenship Consultants - CICC), no registered advisor is legally or ethically allowed to guarantee a 100% positive visa decision. Decisions are made entirely by national board officers. However, our rigorous pre-assessment audits and document representation ensure clean dossiers, delivering a premium 94.6% success metric.'
    },
    {
      id: 'faq-5',
      category: 'Study',
      question: 'What is a Designated Learning Institution (DLI) in Canada and why is it important?',
      answer: 'A DLI is a university or college approved by their provincial government territory to host international students. Applying for study permits requires an official Letter of Acceptance (LOA) from a DLI. Crucially, only specific programs within certified DLIs qualify postgraduates for a Post-Graduation Work Permit (PGWP) to work locally.'
    },
    {
      id: 'faq-6',
      category: 'Work',
      question: 'What is the typical visa processing timeline for a UK Skilled Worker Visa?',
      answer: 'On average, standard UK Skilled Worker Visas receive decisions within 10 to 20 business days post-biometrics submission. For urgent applications, the Home Office offers premium Super Priority and Priority services, fast-tracking decisions to 24 hours or 5 business days for select sectors.'
    },
    {
      id: 'faq-7',
      category: 'PR',
      question: 'How does the Australian ACS Skills Assessment verify foreign degrees?',
      answer: 'The Australian Computer Society (ACS) assesses if your educational background and work history align with Australian Information and Communications Technology (ICT) standards. You must formulate highly detailed structural employment reference letters mapping to specified ANZSCO technology unit codes.'
    },
    {
      id: 'faq-8',
      category: 'Study',
      question: 'What liquid funds must I maintain in my bank to pass student financial reviews?',
      answer: 'Threshold parameters are updated annually. For Canada, you must prove possession of at least $20,635 CAD plus initial tuition fees. For the UK, standard rules require demonstrating £12,006 to £14,040 in liquid savings depending on London parameters. Funds must strictly reside in a certified bank account for a continuous 28-day period prior to submission.'
    },
    {
      id: 'faq-9',
      category: 'Work',
      question: 'Can my spouse and dependent children join me on a study or work permit?',
      answer: 'Absolutely. Spouses of highly skilled professionals and Master\'s / doctoral students can qualify for Open Work Permits, allowing them to participate in the local job market. Dependent school-age children can accompany applicants and attend local state public schools, often without any separate tuition fees.'
    },
    {
      id: 'faq-10',
      category: 'General',
      question: 'What recourse do I have if my visa gets refused? Can I file an appeal?',
      answer: 'Yes. Depending on the country and refusal grounds, you can request an administrative review, file a judicial review in appeal courts (such as the Federal Court of Canada), or submit a revised correction package. Our assessment experts specialize in analyzing visa rejection letters and writing targeted mitigation legal arguments to overturn unfavorable decisions.'
    }
  ];

  // Filter based on search input and active category select filter
  const filteredFaqs = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesSearch =
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-stone-50/30 relative border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section with brand match */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-crimson-500 uppercase">
            Resolution & Compliance Desk
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Frequently Answered Legal Inquiries
          </h2>
          <p className="text-stone-500 text-sm sm:text-base leading-relaxed">
            Review detailed solutions covering language metrics, PR calculations, financial thresholds, and legal processing criteria straight from our regulatory counselors.
          </p>
        </div>

        {/* Categories + Search Row */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-200/60 max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Quick filter tabs */}
          <div className="flex overflow-x-auto gap-1 pb-2 md:pb-0 scrollbar-none" id="faq-category-tabs">
            {(['All', 'General', 'PR', 'Study', 'Work'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setExpandedId(null);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900'
                }`}
                id={`faq-tab-${cat.toLowerCase()}`}
              >
                {cat === 'All' ? 'All Inquiries' : `${cat} Streams`}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search specific questions or terms..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setExpandedId(null);
              }}
              className="w-full bg-stone-50 text-stone-900 pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-medium"
              id="faq-search-input"
            />
          </div>
        </div>

        {/* Accordions Main Area */}
        <div className="max-w-4xl mx-auto space-y-4" id="faq-accordions-group">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedId === faq.id;
                return (
                  <motion.div
                    layout
                    key={faq.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                    className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                      isExpanded 
                        ? 'border-crimson-500/30 shadow-md ring-1 ring-crimson-500/10' 
                        : 'border-stone-200/80 hover:border-stone-300 shadow-xs'
                    }`}
                    id={`faq-item-card-${faq.id}`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      type="button"
                      className="w-full text-left p-5 sm:p-6 flex items-start gap-4 focus:outline-none"
                      id={`faq-trigger-${faq.id}`}
                    >
                      {/* Left icon category marker */}
                      <div className={`mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono transition-colors ${
                        isExpanded ? 'bg-crimson-500 text-white' : 'bg-stone-100 text-stone-500'
                      }`}>
                        {faq.category[0]}
                      </div>

                      <div className="flex-1 space-y-1">
                        <span className="block text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
                          {faq.category} Streams • Question {idx + 1}
                        </span>
                        <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base leading-snug">
                          {faq.question}
                        </h4>
                      </div>

                      <ChevronDown className={`h-5 w-5 text-stone-400 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Collapsible details content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 sm:pb-7 pl-16 sm:pl-17 border-t border-stone-50 bg-stone-50/30">
                            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            <div className="mt-4 flex items-center gap-2 text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                              <Info className="h-3.5 w-3.5 text-crimson-500" />
                              <span>Verified Against live 2026/2027 regulatory updates</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              /* Fallback empty view */
              <div 
                className="text-center py-16 bg-white border border-stone-200/60 rounded-3xl p-8 space-y-4 shadow-xs"
                id="faq-empty-fallback"
              >
                <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center mx-auto text-stone-400">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif font-bold text-stone-900 text-lg">No Matching Inquiries Found</h4>
                  <p className="text-stone-500 text-xs max-w-md mx-auto">
                    Try entering standard keywords like "IELTS", "Express Entry", "sponsorship", "Chancenkarte", or "dependent".
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
                  id="faq-fallback-reset-btn"
                >
                  Reset FAQ Filter
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Help consultation banner bottom */}
        <div className="mt-14 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm" id="faq-consultation-bar">
          <div className="flex items-start gap-4">
            <div className="bg-crimson-50 w-11 h-11 rounded-xl flex items-center justify-center text-crimson-500 flex-shrink-0">
              <FileText className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base">Have a customized or complex visa inquiry?</h4>
              <p className="text-stone-500 text-xs leading-relaxed max-w-md">Our licensed legal counselors represent unique cases daily. Submit a direct consultation assessment ticket.</p>
            </div>
          </div>
          <a
            href="#evaluator"
            className="bg-crimson-500 hover:bg-crimson-600 text-white text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-md mt-2 md:mt-0 whitespace-nowrap text-center"
            id="faq-cta-btn"
          >
            Run Custom Assessment
          </a>
        </div>

      </div>
    </section>
  );
}
