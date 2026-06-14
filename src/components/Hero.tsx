import { ArrowRight, ShieldCheck, Sparkles, Award, Globe2 } from 'lucide-react';
import { motion } from 'motion/react';
import { STATS } from '../data';

interface HeroProps {
  onEvaluateClick: () => void;
  onExploreClick: () => void;
}

export default function Hero({ onEvaluateClick, onExploreClick }: HeroProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden grid-bg-glow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy - column 7 */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Elegant upper sub-badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-crimson-50 border border-crimson-100 px-4 py-1.5 rounded-full"
            >
              <Sparkles className="h-4 w-4 text-crimson-500 animate-pulse" />
              <span className="text-xs font-semibold text-crimson-800 tracking-wide uppercase">
                Premier Visa & Immigration Specialists
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="serif-header text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 leading-[1.12] tracking-tight"
            >
              Your Portal to the World\'s{' '}
              <span className="text-crimson-500 underline decoration-crimson-100 decoration-8 underline-offset-4">
                Premier Destinations
              </span>
            </motion.h1>

            {/* Sub description */}
            <motion.p
              variants={itemVariants}
              className="text-stone-600 text-base sm:text-lg max-w-xl leading-relaxed"
            >
              Navigate complex visa eligibility frameworks with ease. Get assessed by seasoned regulatory lawyers and registered immigration consultants. We turn your global dreams into legal reality.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onEvaluateClick}
                className="bg-crimson-500 hover:bg-crimson-600 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-crimson-500/20 hover:shadow-crimson-600/30 flex items-center justify-center space-x-2 dynamic-btn"
                id="hero-evaluator-btn"
              >
                <span>Check Eligibility Now</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="bg-white hover:bg-stone-50 text-stone-800 font-semibold px-8 py-4 rounded-xl border border-stone-200 transition-all shadow-sm flex items-center justify-center space-x-2"
                id="hero-explore-btn"
              >
                <span>Countries of Choice</span>
              </button>
            </motion.div>

            {/* Feature Trust Pills */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-200/60 max-w-lg"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-medium text-stone-700">ICCRC Registered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span className="text-xs font-medium text-stone-700">100% Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe2 className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-xs font-medium text-stone-700">6 Major Regions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Graphical Info Panel / Card Showcase - column 5 */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-crimson-500 to-rose-300 opacity-20 blur-xl"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative bg-white border border-stone-100 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-stone-50 pb-4">
                <span className="font-serif font-bold text-stone-800">Direct Consultation Hub</span>
                <span className="inline-flex items-center bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  • Advising Live
                </span>
              </div>

              {/* Dynamic checklist / stats */}
              <div className="space-y-4">
                <div className="p-4 bg-stone-50/80 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">Fastest Decision</span>
                  <span className="text-sm font-semibold text-stone-800">Singapore EP — 10 Days Processing</span>
                </div>
                <div className="p-4 bg-stone-50/80 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">Highest Success Stream</span>
                  <span className="text-sm font-semibold text-stone-800">Canada Student Permit (96% success limit)</span>
                </div>
                <div className="p-4 bg-stone-50/80 rounded-xl space-y-1">
                  <span className="text-xs font-bold text-stone-400 block uppercase tracking-wider">New Arrival</span>
                  <span className="text-sm font-semibold text-stone-800">German Chancenkarte point-based visa route</span>
                </div>
              </div>

              {/* Instant Call info */}
              <div className="pt-2">
                <a
                  href="#evaluator"
                  onClick={(e) => {
                    e.preventDefault();
                    onEvaluateClick();
                  }}
                  className="block text-center bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs py-3.5 rounded-xl transition-all uppercase tracking-wider"
                  id="hero-quick-link"
                >
                  Access Wizard Platform
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Static metrics section bottom */}
        <div className="mt-16 sm:mt-24 border-t border-stone-200/80 pt-10" id="hero-stats-row">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-2 text-center md:text-left"
              >
                <span className="block text-3xl sm:text-4xl font-extrabold text-crimson-500 font-mono">
                  {stat.value}
                </span>
                <span className="block text-xs uppercase font-bold tracking-wider text-stone-500">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
