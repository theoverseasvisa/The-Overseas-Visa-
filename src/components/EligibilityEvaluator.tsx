import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Map, 
  Settings, 
  FileCheck,
  Award,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COUNTRIES } from '../data';

interface EligibilityEvaluatorProps {
  preselectedCountryName: string | null;
  resetPreselectedCountry: () => void;
}

interface FormErrors {
  [key: string]: string;
}

export default function EligibilityEvaluator({ 
  preselectedCountryName, 
  resetPreselectedCountry 
}: EligibilityEvaluatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);
  
  // Country code picker options
  const countryCodes = [
    { code: '+1', name: 'US / Canada' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+61', name: 'Australia' },
    { code: '+91', name: 'India' },
    { code: '+65', name: 'Singapore' },
    { code: '+49', name: 'Germany' },
    { code: '+971', name: 'UAE' },
  ];

  // Primary state matching EligibilityFormState
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    destinationCountry: 'Canada',
    visaType: 'Study' as 'Study' | 'Work' | 'Tourist' | 'PR',
    
    // Conditional defaults
    educationLevel: 'Bachelor\'s Degree',
    experienceYears: '2 to 5 Years',
    languageScore: 'IELTS 7.0+',
    budget: '$15k - $30k USD',
    purposeOfVisit: 'Short Term Travel',
    duration: '1 to 3 Months',
    fieldOfExpertise: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Monitor preselected country incoming from CountryExplorer
  useEffect(() => {
    if (preselectedCountryName) {
      setFormData(prev => ({
        ...prev,
        destinationCountry: preselectedCountryName
      }));
      setCurrentStep(2); // Auto jump to Step 2 destination phase
      resetPreselectedCountry(); // Clear applet state
      
      // Focus element
      const element = document.getElementById('evaluator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [preselectedCountryName, resetPreselectedCountry]);

  // Client Validation Logic
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full Legal Name is required to start assessment';
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = 'Name must be at least 3 letters';
      }

      if (!formData.email.trim()) {
        newErrors.email = 'An active Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please provide a valid corporate or personal email';
      }

      const digitsOnly = formData.phone.replace(/\D/g, '');
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required for advisory callback';
      } else if (digitsOnly.length < 7) {
        newErrors.phone = 'Please enter a valid telephone structure';
      }
    }

    if (step === 2) {
      if (!formData.destinationCountry) {
        newErrors.destinationCountry = 'Please select your target country';
      }
      if (!formData.visaType) {
        newErrors.visaType = 'Please select a logical visa category';
      }
    }

    if (step === 3) {
      if (formData.visaType === 'Work' || formData.visaType === 'PR') {
        if (!formData.fieldOfExpertise.trim()) {
          newErrors.fieldOfExpertise = 'Your specialized field or sector designation is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Pre-calculate custom success rating depending on fields
  // USA: harder base rate (80), Canada higher base rate (90), etc.
  // IELTS score (7.0+ gives +10, 6.0 gives +5, IELTS 5.0/None gives -15)
  // Years of experience (5+ years gives +10, under 2 years gives -10)
  const calculateResultScore = () => {
    let base = 85; 

    // Adjust by country choice
    if (formData.destinationCountry === 'United States') base -= 8;
    if (formData.destinationCountry === 'Canada') base += 5;
    if (formData.destinationCountry === 'Singapore') base += 2;

    // Adjust by profile variables
    if (formData.visaType === 'Study') {
      if (formData.budget === 'Under $15k USD') base -= 15;
      if (formData.budget === 'Over $30k USD') base += 8;
      if (formData.educationLevel === 'Master\'s Degree') base += 5;
    } else if (formData.visaType === 'Work' || formData.visaType === 'PR') {
      if (formData.experienceYears === 'Under 2 Years') base -= 12;
      if (formData.experienceYears === 'More than 5 Years') base += 10;
      if (formData.languageScore === 'IELTS 7.0+') base += 8;
      if (formData.languageScore === 'No Exam Prepared') base -= 20;
    }

    // Constraints [10, 98]
    return Math.max(15, Math.min(98, base));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    // Simulate API Submission latency
    setTimeout(() => {
      const countryInitials = formData.destinationCountry.substring(0, 3).toUpperCase();
      const visaInitials = formData.visaType.substring(0, 4).toUpperCase();
      const randomHex = Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase();
      const timestamp = new Date().getFullYear();
      
      setGeneratedRef(`APP-${countryInitials}-${visaInitials}-${timestamp}-${randomHex}`);
      setCalculatedScore(calculateResultScore());
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      countryCode: '+1',
      destinationCountry: 'Canada',
      visaType: 'Study',
      educationLevel: 'Bachelor\'s Degree',
      experienceYears: '2 to 5 Years',
      languageScore: 'IELTS 7.0+',
      budget: '$15k - $30k USD',
      purposeOfVisit: 'Short Term Travel',
      duration: '1 to 3 Months',
      fieldOfExpertise: ''
    });
    setErrors({});
    setCurrentStep(1);
    setSubmitSuccess(false);
    setGeneratedRef('');
    setCalculatedScore(null);
  };

  return (
    <section id="evaluator" className="py-20 md:py-28 relative overflow-hidden bg-white">
      {/* Visual background elements */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-crimson-50 rounded-full filter blur-3xl opacity-30 -mr-20 -mt-20"></div>
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-stone-100 rounded-full filter blur-3xl opacity-40 -ml-40 -mb-40"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Step Indicator Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-crimson-500 uppercase">
            Interactive Advisory Assessment
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Visa Eligibility Evaluator
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Submit your background specifications to calculate preliminary entry matrices under live regulatory filters.
          </p>
        </div>

        {/* Wizard Panel Container */}
        <div className="bg-white rounded-3xl border border-stone-200/80 shadow-xl overflow-hidden min-h-[500px] flex flex-col" id="evaluator-card-panel">
          
          {/* Progress Step Bar */}
          {!submitSuccess && (
            <div className="bg-stone-50 border-b border-stone-100 px-6 sm:px-12 py-5 flex items-center justify-between" id="evaluator-step-bar">
              <div className="flex items-center space-x-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold leading-none transition-colors ${currentStep >= 1 ? 'bg-crimson-500 text-white' : 'bg-stone-200 text-stone-500'}`}>1</span>
                <span className="text-xs font-semibold text-stone-700 hidden sm:inline">Personal Contact</span>
              </div>
              <div className="h-0.5 max-w-[120px] bg-stone-200 flex-1 mx-2">
                <div className={`h-full bg-crimson-500 transition-all duration-300 ${currentStep >= 2 ? 'w-full' : 'w-0'}`}></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold leading-none transition-colors ${currentStep >= 2 ? 'bg-crimson-500 text-white' : 'bg-stone-200 text-stone-500'}`}>2</span>
                <span className="text-xs font-semibold text-stone-700 hidden sm:inline">Destination Intent</span>
              </div>
              <div className="h-0.5 max-w-[120px] bg-stone-200 flex-1 mx-2">
                <div className={`h-full bg-crimson-500 transition-all duration-300 ${currentStep >= 3 ? 'w-full' : 'w-0'}`}></div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold leading-none transition-colors ${currentStep >= 3 ? 'bg-crimson-500 text-white' : 'bg-stone-200 text-stone-500'}`}>3</span>
                <span className="text-xs font-semibold text-stone-700 hidden sm:inline">Profile Detail</span>
              </div>
            </div>
          )}

          {/* Core Content Area */}
          <div className="p-6 sm:p-12 flex-1 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between" id="evaluator-interactive-form">
                  
                  {/* STEP 1: Personal Contact */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      className="space-y-5"
                      id="step-1-container"
                    >
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-lg text-stone-900">Applicant Legal Information</h3>
                        <p className="text-xs text-stone-400">All fields are authenticated directly during government representation submissions.</p>
                      </div>

                      {/* Full Name */}
                      <div className="space-y-1.5 relative">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Full Legal Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                          <input
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                            className={`w-full bg-stone-50/50 text-stone-900 pl-10 pr-4 py-3 rounded-xl text-sm border ${errors.fullName ? 'border-crimson-500 focus:ring-crimson-500/20' : 'border-stone-200 focus:ring-crimson-500/20 focus:border-crimson-500'} focus:outline-none focus:ring-2 transition-all font-medium`}
                            id="input-fullName"
                          />
                        </div>
                        {errors.fullName && (
                          <span className="flex items-center text-xs text-crimson-600 font-semibold space-x-1 pt-1">
                            <AlertCircle className="h-3 w-3 flex-shrink-0" />
                            <span>{errors.fullName}</span>
                          </span>
                        )}
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5 relative">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Primary Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                          <input
                            type="email"
                            placeholder="john.doe@immigration.com"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className={`w-full bg-stone-50/50 text-stone-900 pl-10 pr-4 py-3 rounded-xl text-sm border ${errors.email ? 'border-crimson-500 focus:ring-crimson-500/20' : 'border-stone-200 focus:ring-crimson-500/20 focus:border-crimson-500'} focus:outline-none focus:ring-2 transition-all font-medium`}
                            id="input-email"
                          />
                        </div>
                        {errors.email && (
                          <span className="flex items-center text-xs text-crimson-600 font-semibold space-x-1 pt-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.email}</span>
                          </span>
                        )}
                      </div>

                      {/* Phone with Country Code picker */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Contact Phone Number</label>
                        <div className="flex gap-2">
                          {/* Pick code */}
                          <div className="relative w-36 flex-shrink-0">
                            <select
                              value={formData.countryCode}
                              onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                              className="w-full bg-stone-50/50 text-stone-800 px-3 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 font-semibold"
                              id="input-countryCode"
                            >
                              {countryCodes.map((c) => (
                                <option key={c.code} value={c.code}>
                                  {c.code} ({c.name.split(' ')[0]})
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          {/* Actual Number */}
                          <div className="relative flex-1">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                            <input
                              type="tel"
                              placeholder="98960 08298"
                              value={formData.phone}
                              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                              className={`w-full bg-stone-50/50 text-stone-900 pl-10 pr-4 py-3 rounded-xl text-sm border ${errors.phone ? 'border-crimson-500 focus:ring-crimson-500/20' : 'border-stone-200 focus:ring-crimson-500/20 focus:border-crimson-500'} focus:outline-none focus:ring-2 transition-all font-medium`}
                              id="input-phone"
                            />
                          </div>
                        </div>
                        {errors.phone && (
                          <span className="flex items-center text-xs text-crimson-600 font-semibold space-x-1 pt-1">
                            <AlertCircle className="h-3 w-3" />
                            <span>{errors.phone}</span>
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: Destination Select */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      className="space-y-6"
                      id="step-2-container"
                    >
                      <div className="space-y-1">
                        <h3 className="font-serif font-bold text-lg text-stone-900">Destination & Intent Selection</h3>
                        <p className="text-xs text-stone-400">Match government programs against standard country requirements.</p>
                      </div>

                      {/* Destination Country Selection */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Country of Choice</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" id="destination-options-grid">
                          {COUNTRIES.map((cty) => (
                            <button
                              key={cty.id}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, destinationCountry: cty.name }))}
                              className={`p-3.5 rounded-xl border text-left flex items-center space-x-3 transition-all ${
                                formData.destinationCountry === cty.name
                                  ? 'bg-crimson-500 border-crimson-500 text-white shadow-md'
                                  : 'bg-stone-50 hover:bg-stone-100/50 border-stone-200 text-stone-800'
                              }`}
                              id={`dest-selector-btn-${cty.id}`}
                            >
                              <span className="text-xl leading-none">{cty.flag}</span>
                              <span className="text-xs font-semibold truncate">{cty.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Visa Category Select */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Visa Stream Category</label>
                        <div className="grid grid-cols-2 gap-3" id="visa-options-grid">
                          {[
                            { name: 'Study', icon: '🎓', desc: 'Degree, Diploma or Language and work rights' },
                            { name: 'Work', icon: '💼', desc: 'Direct corporate sponsor or local employment search' },
                            { name: 'Tourist', icon: '✈️', desc: 'Standard business conference, or leisure holiday stay' },
                            { name: 'PR', icon: '📜', desc: 'Permanent Residency point metrics & settlement systems' },
                          ].map((cat) => (
                            <button
                              key={cat.name}
                              type="button"
                              onClick={() => setFormData(p => ({ ...p, visaType: cat.name as any }))}
                              className={`p-4 rounded-xl border text-left flex flex-col justify-between space-y-1.5 transition-all ${
                                formData.visaType === cat.name
                                  ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                                  : 'bg-stone-50 hover:bg-stone-100/50 border-stone-200 text-stone-800'
                              }`}
                              id={`visa-selector-btn-${cat.name.toLowerCase()}`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{cat.icon}</span>
                                <span className="text-sm font-bold">{cat.name} Visa</span>
                              </div>
                              <span className={`text-[10px] leading-snug ${formData.visaType === cat.name ? 'text-stone-300' : 'text-stone-400'}`}>
                                {cat.desc}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Profile Criteria */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      className="space-y-5"
                      id="step-3-container"
                    >
                      <div className="space-y-1 border-b border-stone-100 pb-3">
                        <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                          <span>Dynamic Profile Specifications</span>
                          <span className="inline-block px-2.5 py-0.5 rounded-full bg-crimson-50 text-crimson-700 text-[10px] font-bold">
                            {formData.visaType} Stream
                          </span>
                        </h3>
                        <p className="text-xs text-stone-400">Government processing algorithms analyze these specific assets to determine risk quotients.</p>
                      </div>

                      {/* CONDITIONAL FIELD CONTAINER 1 - Visa is "Study" */}
                      {formData.visaType === 'Study' && (
                        <div className="space-y-4" id="conditional-study-fields">
                          {/* Current Education */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Highest Level of Current Education</label>
                            <select
                              value={formData.educationLevel}
                              onChange={(e) => setFormData(p => ({ ...p, educationLevel: e.target.value }))}
                              className="w-full bg-stone-50/50 text-stone-900 px-4 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-semibold"
                              id="study-edu-level"
                            >
                              <option value="High School">High School (12th Grade Completion)</option>
                              <option value="Associate / Diploma">Associate Degree / Polytech Diploma</option>
                              <option value="Bachelor's Degree">Bachelor\'s Degree Completed</option>
                              <option value="Master's Degree">Master\'s Degree or Doctorate Complete</option>
                            </select>
                          </div>

                          {/* Budget Selection */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Available Tuition & Initial Maintenance Budget</label>
                            <select
                              value={formData.budget}
                              onChange={(e) => setFormData(p => ({ ...p, budget: e.target.value }))}
                              className="w-full bg-stone-50/50 text-stone-900 px-4 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-semibold"
                              id="study-budget"
                            >
                              <option value="Under $15k USD">Under $15,000 USD (Limited College/Visa options)</option>
                              <option value="$15k - $30k USD">$15,000 - $30,000 USD (Adequate standard private/state colleges)</option>
                              <option value="Over $30k USD">Over $30,000 USD (Premium Universities & stable sponsorship)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* CONDITIONAL FIELD CONTAINER 2 - Visa is "Work" or "PR" */}
                      {(formData.visaType === 'Work' || formData.visaType === 'PR') && (
                        <div className="space-y-4" id="conditional-professional-fields">
                          {/* Field of Expertise */}
                          <div className="space-y-1.5 relative">
                            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Specialized Professional Sector / Job Role</label>
                            <div className="relative">
                              <Settings className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                              <input
                                type="text"
                                placeholder="..."
                                value={formData.fieldOfExpertise}
                                onChange={(e) => setFormData(prev => ({ ...prev, fieldOfExpertise: e.target.value }))}
                                className={`w-full bg-stone-50/50 text-stone-900 pl-10 pr-4 py-3 rounded-xl text-sm border ${errors.fieldOfExpertise ? 'border-crimson-500' : 'border-stone-200'} focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-medium`}
                                id="work-field"
                              />
                            </div>
                            {errors.fieldOfExpertise ? (
                              <span className="flex items-center text-xs text-crimson-600 font-semibold space-x-1 pt-1">
                                <AlertCircle className="h-3 w-3" />
                                <span>{errors.fieldOfExpertise}</span>
                              </span>
                            ) : (
                              <span className="block text-[10px] text-stone-400">e.g., Software Engineering, ICU Register Nurse, Financial Auditor, Welders</span>
                            )}
                          </div>

                          {/* Years Experience */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Years of Professional Experience in Specified Role</label>
                            <select
                              value={formData.experienceYears}
                              onChange={(e) => setFormData(p => ({ ...p, experienceYears: e.target.value }))}
                              className="w-full bg-stone-50/50 text-stone-900 px-4 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-semibold"
                              id="work-exp-years"
                            >
                              <option value="Under 2 Years">Under 2 Years (Entry/High risk for direct hiring)</option>
                              <option value="2 to 5 Years">2 to 5 Years (Medium eligibility, high point bracket)</option>
                              <option value="More than 5 Years">More than 5 Years (Premium, fast-tracked employer hiring)</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* CONDITIONAL FIELD CONTAINER 3 - Visa is "Tourist" */}
                      {formData.visaType === 'Tourist' && (
                        <div className="space-y-4" id="conditional-tourist-fields">
                          {/* Purpose */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Primary Purpose of Travel Visit</label>
                            <select
                              value={formData.purposeOfVisit}
                              onChange={(e) => setFormData(p => ({ ...p, purposeOfVisit: e.target.value }))}
                              className="w-full bg-stone-50/50 text-stone-900 px-4 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-semibold"
                              id="tourist-purpose"
                            >
                              <option value="Family / Friend Holiday">Visiting immediate relatives / Leisure holiday tour</option>
                              <option value="Business Conference">Attending signed corporate seminar / short business discussions</option>
                              <option value="Medical Tourism">Seeking registered medical checks & local clinic attention</option>
                            </select>
                          </div>

                          {/* Duration */}
                          <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">Proposed Duration of Stay</label>
                            <select
                              value={formData.duration}
                              onChange={(e) => setFormData(p => ({ ...p, duration: e.target.value }))}
                              className="w-full bg-stone-50/50 text-stone-900 px-4 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-semibold"
                              id="tourist-duration"
                            >
                              <option value="Less than 1 Month">Short Travel: Under 30 Days</option>
                              <option value="1 to 3 Months">Intermediate Travel: 1 to 3 Months</option>
                              <option value="More than 3 Months">Extended Stay: More than 90 Days</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {/* Global Language Test score selector (all visa streams will benefit from checking English levels) */}
                      <div className="space-y-1.5 pt-1">
                        <label className="block text-xs font-bold text-stone-600 uppercase tracking-wide">English Language Proficiency Level</label>
                        <select
                          value={formData.languageScore}
                          onChange={(e) => setFormData(p => ({ ...p, languageScore: e.target.value }))}
                          className="w-full bg-stone-50/50 text-stone-900 px-4 py-3 rounded-xl text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-crimson-500/20 focus:border-crimson-500 transition-all font-semibold"
                          id="global-lang-level"
                        >
                          <option value="Native English">Native Speaker / Born in Canada, US, UK, AU</option>
                          <option value="IELTS 7.0+">IELTS Band 7.0 or Higher (CLB 8+ equivalents)</option>
                          <option value="IELTS 6.0 - 6.5">IELTS Band 6.0 to 6.5 (Standard passing minimum)</option>
                          <option value="No Exam Prepared">Not Attempted / No English test prepared yet</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Button Footer row */}
                  <div className="flex justify-between items-center pt-8 border-t border-stone-100 mt-6" id="evaluator-nav-actions">
                    {/* Backward command */}
                    <div>
                      {currentStep > 1 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          disabled={isSubmitting}
                          className="px-5 py-3 rounded-xl text-xs font-bold text-stone-500 hover:text-stone-800 transition-all hover:bg-stone-50 flex items-center space-x-2"
                          id="evaluator-prev-step-btn"
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span>Previous Phase</span>
                        </button>
                      ) : (
                        <div className="w-10"></div>
                      )}
                    </div>

                    {/* Forward Command / Submit */}
                    <div>
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="bg-crimson-500 hover:bg-crimson-600 text-white px-7 py-3 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-2"
                          id="evaluator-next-step-btn"
                        >
                          <span>Proceed Next</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center space-x-2 min-w-[170px] justify-center"
                          id="evaluator-submit-form-btn"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-crimson-500" />
                              <span>Analysing File...</span>
                            </>
                          ) : (
                            <>
                              <FileCheck className="h-4 w-4" />
                              <span>Submit Assessment</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                </form>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8 py-4 text-center"
                  id="evaluator-success-panel"
                >
                  <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-emerald-100 shadow-sm">
                    <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-serif font-black text-2xl sm:text-3xl text-stone-900 tracking-tight">
                      Evaluation Report Calculated
                    </h3>
                    <p className="text-stone-500 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                      Your legal parameters have been securely compiled and processed against country matrices.
                    </p>
                  </div>

                  {/* Calculated Score card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
                    {/* Score section */}
                    <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="block text-2xl sm:text-3xl font-mono font-black text-crimson-500">
                          {calculatedScore}%
                        </span>
                        <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                          Approval Probability Factor
                        </span>
                      </div>
                      
                      {calculatedScore && calculatedScore >= 80 ? (
                        <p className="text-[11px] text-stone-300 leading-normal">
                          Excellent. Your high language skill level and professional parameters qualify for fast-track nominations.
                        </p>
                      ) : calculatedScore && calculatedScore >= 60 ? (
                        <p className="text-[11px] text-stone-300 leading-normal">
                          Stable Profile. Adequate funds and support records place you in safe margins for general processing.
                        </p>
                      ) : (
                        <p className="text-[11px] text-stone-300 leading-normal">
                          Requires optimization. We highly recommend improving language assessment metrics or financial buffers.
                        </p>
                      )}
                    </div>

                    {/* Reference details Section */}
                    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 text-left flex flex-col justify-between space-y-3">
                      <div>
                        <span className="block text-[10px] text-stone-400 font-extrabold uppercase tracking-widest leading-none">
                          Reference Tracking Key
                        </span>
                        <span className="block text-[13px] font-mono font-extrabold text-stone-800 tracking-wide mt-1">
                          {generatedRef}
                        </span>
                      </div>
                      
                      <div className="space-y-1.5 border-t border-stone-200/50 pt-2 text-[11px] text-stone-600">
                        <div>
                          <strong>Applicant:</strong> {formData.fullName}
                        </div>
                        <div>
                          <strong>Target:</strong> {formData.destinationCountry} ({formData.visaType} Stream)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Direct Contact advice */}
                  <div className="max-w-md mx-auto p-4 border border-rose-100 bg-rose-50/40 rounded-xl flex items-start space-x-3 text-left">
                    <Award className="h-4 w-4 text-crimson-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-crimson-800">Assigned Case Manager Checklist</span>
                      <p className="text-[11px] text-stone-600 mt-0.5">
                        In accordance with official guidelines, a licensed officer will schedule a phone consultation to review your {generatedRef} reference key.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-center space-x-4">
                    <button
                      onClick={handleReset}
                      className="bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 hover:border-stone-400 font-bold text-xs px-6 py-3 rounded-lg transition-all"
                      id="reset-evaluator-btn"
                    >
                      Reset Evaluator Form
                    </button>
                    
                    <a
                      href="#contact"
                      className="bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-xs px-6 py-3 rounded-lg transition-all shadow-md"
                      id="evaluator-success-cta-btn"
                    >
                      Official Representation Enquiry
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
