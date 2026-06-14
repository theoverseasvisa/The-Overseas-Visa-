import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data';

export default function FeedbackSection() {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-stone-50/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold tracking-widest text-crimson-500 uppercase">
            Client Triumphs
          </span>
          <h2 className="serif-header text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Success Narratives from Our Immigrants
          </h2>
          <p className="text-stone-500 text-sm leading-relaxed">
            Real stories, verified reference records, and pathways navigated by global professionals who chose our advisory teams to represent their immigration profiles.
          </p>
        </div>

        {/* Testimonials Grid block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="testimonials-grid">
          {TESTIMONIALS.map((col, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              key={col.id}
              className="bg-white rounded-2xl border border-stone-200/60 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 relative group"
              id={`testimonial-card-${col.id}`}
            >
              {/* Absolutes Quote watermark symbol */}
              <Quote className="absolute right-6 top-6 h-10 w-10 text-stone-100 opacity-80 group-hover:text-crimson-500/10 transition-colors pointer-events-none" />

              {/* Quote description text */}
              <div className="space-y-4 relative z-10">
                {/* 5-stars list */}
                <div className="flex space-x-1" id={`stars-rating-list-${col.id}`}>
                  {[...Array(col.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="font-serif italic text-stone-700 text-sm sm:text-base leading-relaxed">
                  "{col.quote}"
                </p>
              </div>

              {/* Bottom bio info section */}
              <div className="flex items-center space-x-4 border-t border-stone-100 pt-5 relative z-10">
                <div className="w-11 h-11 bg-crimson-50/70 border border-crimson-100/50 rounded-full flex items-center justify-center font-bold text-xs text-crimson-700 tracking-wide select-none">
                  {col.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm leading-none">{col.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest leading-none">
                      Migrated To {col.destination}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-[10px] font-mono font-bold text-crimson-500 leading-none bg-crimson-50 px-1.5 py-0.5 rounded">
                      {col.visaType}
                    </span>
                  </div>
                </div>
                <div className="ml-auto text-right text-[10px] text-stone-400 font-bold">
                  Class Of {col.year}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Dynamic guarantee message row */}
        <div className="mt-16 bg-stone-900 text-white rounded-3xl p-8 sm:p-10 relative overflow-hidden shadow-xl max-w-5xl mx-auto" id="testimonials-guarantee-banner">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-crimson-800/10 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="bg-crimson-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Our Representation Guarantee</span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl mt-1.5 text-white leading-tight">Licensed Legal Auditing Practices Only</h3>
              <p className="text-stone-400 text-xs sm:text-sm">
                We handle every appeal, point calculations, and filing task under strict compliance rules with regional bar councils and oversight registers.
              </p>
            </div>
            <a
              href="#evaluator"
              className="bg-crimson-500 hover:bg-crimson-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-crimson-500/20 uppercase tracking-wider"
              id="guarantee-cta"
            >
              Start Free Assessment
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
