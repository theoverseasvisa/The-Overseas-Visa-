export interface CountryData {
  id: string;
  name: string;
  code: string; // ISO code or short code
  region: 'Europe' | 'Americas' | 'APAC';
  flag: string; // Emoji flag or icon identifier
  successRate: number; // e.g., 96
  processingTime: string; // e.g., "15 - 30 Days"
  minLanguageScore: string; // e.g., "IELTS 6.0" or "TOEFL 80"
  topVisaType: string; // e.g., "Express Entry PR"
  description: string;
  requirements: string[];
}

export interface TestimonialData {
  id: string;
  name: string;
  destination: string;
  visaType: string;
  quote: string;
  rating: number;
  avatar: string; // Image placeholder or SVG icon name
  year: string;
}

export interface EligibilityFormState {
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  destinationCountry: string;
  visaType: 'Study' | 'Work' | 'Tourist' | 'PR';
  // Conditional Profile Fields
  educationLevel?: string;
  experienceYears?: number;
  languageScore?: string;
  budget?: string;
  purposeOfVisit?: string;
  duration?: string;
}

export interface DepartmentContact {
  id: string;
  name: string;
  icon: string;
  preFilledMessage: string;
}
