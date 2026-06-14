import { CountryData, TestimonialData, DepartmentContact } from './types';

export const COUNTRIES: CountryData[] = [
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    region: 'Americas',
    flag: '🇨🇦',
    successRate: 96,
    processingTime: '15 - 30 Days',
    minLanguageScore: 'IELTS 6.5 / CLB 7',
    topVisaType: 'Express Entry PR / Study Permit',
    description: 'A global leader in welcoming skilled professionals and international students. Blessed with scenic landscapes, multi-cultural cities, and excellent PR pathways.',
    requirements: [
      'Valid language scorecard (IELTS General/Academic or CELPIP)',
      'ECA (Educational Credential Assessment) via WES',
      'Proof of settlement funds for single or family applicant',
      'Medical clearance certificate from authorized panel physician'
    ]
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    code: 'GB',
    region: 'Europe',
    flag: '🇬🇧',
    successRate: 94,
    processingTime: '10 - 20 Days',
    minLanguageScore: 'IELTS 6.0 / PTE 58',
    topVisaType: 'Skilled Worker / Student Route',
    description: 'The academic hub of Europe. Fast-track options for healthcare workers, tech innovators, and stellar university graduates under the Graduate Route.',
    requirements: [
      'Valid Certificate of Sponsorship (CoS) from licenced UK sponsor',
      'An approved TB test result certificate for specific countries',
      'Proof of English proficiency (UKVI specific exams)',
      'Sufficient personal bank maintenance balance'
    ]
  },
  {
    id: 'australia',
    name: 'Australia',
    code: 'AU',
    region: 'APAC',
    flag: '🇦🇺',
    successRate: 95,
    processingTime: '20 - 40 Days',
    minLanguageScore: 'IELTS 6.0 / PTE 50',
    topVisaType: 'Subclass 189 PR / Graduate 485',
    description: 'Brimming with career prospects, pristine gold-coast beaches, and premium lifestyle benefits. The point-based skilled visa makes PR accessible.',
    requirements: [
      'Skill Assessment from designated assessing body (ACS, Engineers Australia, etc)',
      'Age criteria must be strictly under 45 years',
      'EOI (Expression of Interest) submitted in SkillSelect',
      'Police clearance checks and state sponsorship nomination rules apply'
    ]
  },
  {
    id: 'usa',
    name: 'United States',
    code: 'US',
    region: 'Americas',
    flag: '🇺🇸',
    successRate: 88,
    processingTime: '30 - 60 Days',
    minLanguageScore: 'TOEFL 90 / IELTS 7.0',
    topVisaType: 'F-1 Student / H-1B Work / EB-2 NIW',
    description: 'The frontier of innovation and business. From world-class research institutes to Silicon Valley job markets, USA remains a prime tier-1 objective.',
    requirements: [
      'Standardized academic acceptances with I-20 or DS-2019 documents',
      'Labor Certification clearance or National Interest Waiver qualifications',
      'DS-160 visa filing with premium or non-premium appointment slots',
      'Strong ties check ensuring logical intent of temporary stay'
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    region: 'Europe',
    flag: '🇩🇪',
    successRate: 92,
    processingTime: '15 - 25 Days',
    minLanguageScore: 'IELTS 6.0 / B2 German',
    topVisaType: 'Opportunity Card (Chancenkarte) / Blue Card',
    description: 'Europe\'s powerhouse economy. The brand new Opportunity Card enables skilled migrants to search for careers whilst living in Germany with ease.',
    requirements: [
      'Recognized university degree or certified vocational training',
      'Point criteria eligibility or certified pre-arranged employment offer',
      'German Blocked Account (Sperrkonto) for living maintenance',
      'Basic communication skill certificates in either English or German'
    ]
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SG',
    region: 'APAC',
    flag: '🇸🇬',
    successRate: 93,
    processingTime: '10 - 15 Days',
    minLanguageScore: 'Not Required / English Native',
    topVisaType: 'Employment Pass (EP) / S Pass',
    description: 'Asia-Pacific\'s global corporate capital. Offers safe, tax-efficient, modern, and highly connected corporate living with rapid turnaround processes.',
    requirements: [
      'Pre-negotiated job offer meeting high-salary thresholds (COMPASS score system)',
      'Employer registration profile in the Ministry of Manpower portal',
      'Degree verification certificate of authenticated credentials',
      'Strict background compliance clearance check'
    ]
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    name: 'Vikram Jit Singh',
    destination: 'Canada',
    visaType: 'Express Entry PR',
    quote: 'The eligibility evaluator assessed my score accurately. The team worked tirelessly on my Educational Assessments and file, securing my Canadian Permanent Residency in record time. Professional beyond standard expectations!',
    rating: 5,
    avatar: 'VS',
    year: '2025'
  },
  {
    id: '2',
    name: 'Elena Rostova',
    destination: 'Germany',
    visaType: 'EU Blue Card',
    quote: 'Absolutely outstanding support for my Opportunities Card application. Navigating German embassy bureaucracy would have been impossible without their step-by-step guidance and document reviews.',
    rating: 5,
    avatar: 'ER',
    year: '2026'
  },
  {
    id: '3',
    name: 'Marcus Davenport',
    destination: 'United Kingdom',
    visaType: 'Skilled Worker Visa',
    quote: 'They verified my corporate sponsor details, handled my family tier-2 dependent files, and prepped me for the biometric visa interviews. Extremely fast turnaround!',
    rating: 5,
    avatar: 'MD',
    year: '2025'
  },
  {
    id: '4',
    name: 'Ananya Iyer',
    destination: 'Australia',
    visaType: 'Subclass 500 Student',
    quote: 'Gaining admission and visa approval for University of Melbourne was seamless. From SOP review to finding standard health covers, they handled every nuance flawlessly.',
    rating: 5,
    avatar: 'AI',
    year: '2026'
  }
];

export const DEPARTMENTS: DepartmentContact[] = [
  {
    id: 'study',
    name: 'Study Visa Help',
    icon: 'GraduationCap',
    preFilledMessage: 'Hi, I am interested in seeking admission and applying for a Study Visa. Please connect me to an educational advisor.'
  },
  {
    id: 'pr',
    name: 'PR & Citizenship Inquiries',
    icon: 'FileCheck',
    preFilledMessage: 'Hello, I would like to check my point score eligibility for Canada Express Entry & Australia PR visas.'
  },
  {
    id: 'work',
    name: 'Work Visa & Migration',
    icon: 'Briefcase',
    preFilledMessage: 'Hi there, I am looking for visa solutions under critical skilled worker programs, corporate relocation, or Germany Opportunity Card.'
  },
  {
    id: 'tourist',
    name: 'Tourist & General Consult',
    icon: 'Compass',
    preFilledMessage: 'Hello, I would like assistance in filing for standard travel visas, tourist streams, or urgent visa services.'
  }
];

export const STATS = [
  { label: 'Visa Success Rate', value: '94.6%' },
  { label: 'Visa Approvals', value: '12,500+' },
  { label: 'Consultations Done', value: '45,000+' },
  { label: 'Years Of Excellence', value: '18+' }
];
