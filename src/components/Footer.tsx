import { Mail, Phone, Scale, Globe, MessageSquare } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-stone-900 text-stone-300 pt-16 pb-12 overflow-hidden border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Col 1: Logo & Regulatory standards (4 columns) */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <a href="#home" className="inline-block transition-transform hover:scale-102" id="footer-logo">
              <Logo light />
            </a>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              We provide premier legal advisory, profile assessment, and representative services for international professionals, students, and businesses wishing to relocate abroad.
            </p>

            {/* Scale compliance block */}
            <div className="p-3.5 bg-stone-850/80 rounded-xl border border-stone-800/60 space-y-2 max-w-xs">
              <div className="flex items-center space-x-2 text-xs font-semibold text-stone-200">
                <Scale className="h-4 w-4 text-crimson-500" />
                <span>Regulatory Council Standard</span>
              </div>
              <p className="text-[10px] text-stone-400 leading-normal">
                Licensed Practitioners: Certified advisory support mapping to global compliance parameters. Strict compliance oversight applied.
              </p>
            </div>
          </div>

          {/* Col 2: Direct Contact Desk (5 columns) */}
          <div className="col-span-1 lg:col-span-5 space-y-4">
            <span className="block text-xs font-extrabold tracking-widest text-white uppercase">
              Direct Contact Desk
            </span>
            
            <div className="space-y-4 pt-1" id="footer-contacts-list">
              <p className="text-xs text-stone-400 max-w-sm leading-normal">
                Connect with our advisors instantly via Phone, Email, or WhatsApp. We support global applicants with native counseling.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone Call */}
                <a 
                  href="tel:+919896008298"
                  className="p-3 bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-800 flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-crimson-500/10 flex items-center justify-center text-crimson-500 group-hover:bg-crimson-500 group-hover:text-white transition-colors">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase">Call Advisory</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">+91 98960 08298</span>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://api.whatsapp.com/send?phone=919896008298&text=Hi%2C%20I%20am%20interested%20in%2520seeking%2520advisory%2520from%2520The%2520Overseas%2520Visa."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-stone-850 hover:bg-stone-850/60 rounded-xl border border-stone-800 flex items-center gap-3 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase font-mono">WhatsApp</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">+91 98960 08298</span>
                  </div>
                </a>

                {/* Email Address */}
                <a 
                  href="mailto:theoverseasvisa@gmail.com"
                  className="p-3 bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-800 flex items-center gap-3 transition-colors group col-span-1 sm:col-span-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase">Official Email</span>
                    <span className="text-xs sm:text-sm font-semibold text-white break-all">theoverseasvisa@gmail.com</span>
                  </div>
                </a>

                {/* Website domain */}
                <a 
                  href="https://www.theoverseasvisa.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-stone-850 hover:bg-stone-800 rounded-xl border border-stone-800 flex items-center gap-3 transition-colors group col-span-1 sm:col-span-2"
                >
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                    <Globe className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-stone-500 uppercase">Website URL</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">www.theoverseasvisa.in</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation links (3 columns) */}
          <div className="col-span-1 lg:col-span-3 space-y-4">
            <span className="block text-xs font-extrabold tracking-widest text-white uppercase">
              Corporate Map
            </span>
            
            <ul className="grid grid-cols-1 gap-2.5 text-xs pt-1" id="footer-nav-links">
              {[
                { name: 'Home Landing', href: '#home' },
                { name: 'Services Streams', href: '#services' },
                { name: 'Target Countries', href: '#countries' },
                { name: 'Profile Assessor', href: '#evaluator' },
                { name: 'Client Stories', href: '#testimonials' },
                { name: 'FAQ Section', href: '#faq' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-crimson-500 transition-colors inline-block text-stone-400 hover:text-white"
                    id={`footer-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Lower copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} The Overseas Visa - Visa & Immigration Services. All rights reserved under strict regulatory licensing limits.</p>
          
          <div className="flex space-x-6">
            <a href="#evaluator" className="hover:text-stone-300 transition-colors">Privacy Charter</a>
            <a href="#evaluator" className="hover:text-stone-300 transition-colors">Filing Disclaimers</a>
            <a href="#evaluator" className="hover:text-stone-300 transition-colors">Client Representation Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
