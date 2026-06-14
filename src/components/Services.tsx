import { Briefcase, GraduationCap, Plane, TrendingUp, UserCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Services() {
  const serviceList = [
    {
      icon: <GraduationCap className="h-6 w-6 text-crimson-500" />,
      title: 'Global Student Route Permits',
      desc: 'Full assistance in compiling Statements of Purpose (SOP), selecting accredited designated learning institutions (DLI), filing Study Permits, and coordinating blocked account deposits.',
      highlight: '96% Success rate in Canada & UK',
    },
    {
      icon: <Briefcase className="h-6 w-6 text-crimson-500" />,
      title: 'Skilled Migration & PR Pools',
      desc: 'Expert representation inside Canadian Express Entry, Australian SkillSelect EOI, and Germany Opportunity matrix points tables. We manage complete Skills Assessments.',
      highlight: 'Point-assessment audits in 24 hr',
    },
    {
      icon: <UserCheck className="h-6 w-6 text-crimson-500" />,
      title: 'Employer Sponsored Work Visas',
      desc: 'Navigating UK Certificate of Sponsorship (CoS), Singapore COMPASS point passes, EU Blue Card parameters, and US Labor Certifications for corporate executives and skilled trades.',
      highlight: 'Full compliance with local job markers',
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-crimson-500" />,
      title: 'Business & Investor Streams',
      desc: 'Premium fast-track visas via EB-5 investments, European Golden Visas, and innovative Start-up residency permits for founders with venture capital commitments.',
      highlight: 'Direct legal structuring available',
    },
    {
      icon: <Plane className="h-6 w-6 text-crimson-500" />,
      title: 'Tourist & Short-Term Holidays',
      desc: 'Coordinating standard tourist visa files, business visit registrations, medical consult travel approvals, and speedy Schengen visa appointments with perfect cover letters.',
      highlight: 'Fast-track Schengen & US appointments',
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-crimson-500" />,
      title: 'Family & Dependent Sponsorships',
      desc: 'Unifying families via Spouse work permits, parents Super Visas, child dependent applications, and direct spousal PR sponsorships with comprehensive marriage file audits.',
      highlight: 'Complete file bundling support',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="services-header">
          <span className="text-xs font-extrabold tracking-widest text-crimson-500 uppercase">
            Consultancy Offerings
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Specialized Legal Representation streams
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Every visa pathway has exact documentation specifications. Our lawyers review every legal certificate to guarantee compliance with regional immigration frameworks.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="svc-grid">
          {serviceList.map((svc, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              key={idx}
              className="svc-card bg-stone-50/50 hover:bg-white rounded-2xl border border-stone-100/85 hover:border-crimson-500/10 p-6 sm:p-8 hover:shadow-lg transition-all flex flex-col justify-between"
              id={`service-card-${idx}`}
            >
              <div className="space-y-4">
                {/* Icon Capsule */}
                <div className="w-12 h-12 bg-crimson-50 rounded-xl flex items-center justify-center border border-crimson-100/45 shadow-xs">
                  {svc.icon}
                </div>
                
                <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-crimson-500 transition-colors">
                  {svc.title}
                </h3>
                
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  {svc.desc}
                </p>
              </div>

              {/* Success rating capsule feedback */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-medium">Metric standard:</span>
                <span className="font-bold text-crimson-700 font-mono bg-crimson-50/70 px-2 py-0.5 rounded">
                  {svc.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
