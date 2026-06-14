import { useState } from 'react';
import { MessageCircle, X, Send, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DEPARTMENTS } from '../data';

export default function WhatsAppDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState('study');
  const [visitorName, setVisitorName] = useState('');
  const [customText, setCustomText] = useState('');

  const currentDept = DEPARTMENTS.find(d => d.id === selectedDeptId) || DEPARTMENTS[0];

  const handleRedirect = () => {
    // Standard Whatsapp template API: https://wa.me/<number>?text=<urlencoded_text>
    // Using user-provided WhatsApp number: +91 98960 08298
    const officeNumber = '919896008298';
    const nameStr = visitorName.trim() ? ` My name is ${visitorName.trim()}.` : '';
    const customStr = customText.trim() ? ` ${customText.trim()}` : '';
    const finalMsg = `${currentDept.preFilledMessage}${nameStr}${customStr}`;
    
    const url = `https://api.whatsapp.com/send?phone=${officeNumber}&text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40" id="whatsapp-widget-container">
      {/* Floating Messenger Icon Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="wa-btn bg-emerald-600 hover:bg-emerald-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-emerald-600/30 transition-all border border-emerald-500/10 cursor-pointer relative"
        id="widget-wa-launcher-btn"
      >
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full animate-bounce"></span>
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Floating Chat Drawer Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] bg-white rounded-3xl border border-stone-200/80 shadow-2xl overflow-hidden flex flex-col"
            id="wa-messenger-drawer"
          >
            {/* Header section with virtual consultant */}
            <div className="bg-emerald-600 px-6 py-5 text-white flex justify-between items-center relative">
              <div className="absolute right-0 bottom-0 top-0 w-24 bg-gradient-to-l from-emerald-700/20 to-transparent pointer-events-none"></div>
              
              <div className="flex items-center space-x-3.5 z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold relative text-sm border border-white/20">
                  SC
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-emerald-600 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Sarah Chen</h4>
                  <span className="text-[10px] text-emerald-100 flex items-center space-x-1">
                    <CheckCheck className="h-3 w-3 text-emerald-300" />
                    <span>Compliance Advisory Desk</span>
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-emerald-100 p-1 rounded-full hover:bg-emerald-700 transition-colors z-10"
                id="wa-drawer-close-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Micro chat screen content */}
            <div className="p-5 space-y-4 max-h-[360px] overflow-y-auto bg-stone-50/50">
              
              {/* Automated initial bubble message */}
              <div className="flex items-start space-x-2.5">
                <div className="w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  SC
                </div>
                <div className="bg-white border border-stone-100 p-3 rounded-2xl rounded-tl-none shadow-xs text-xs text-stone-700 max-w-[85%] leading-relaxed">
                  Hi there! We are currently advising on live visa slots. Which specialized department can I transfer you to?
                </div>
              </div>

              {/* Department Selecting Grid */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">
                  1. Choose Target Inquiry Department
                </span>
                <div className="grid grid-cols-1 gap-1.5" id="wa-departments-list">
                  {DEPARTMENTS.map((dept) => {
                    const isSelected = dept.id === selectedDeptId;
                    return (
                      <button
                        key={dept.id}
                        onClick={() => setSelectedDeptId(dept.id)}
                        className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center space-x-3 ${
                          isSelected
                            ? 'bg-emerald-50/80 border-emerald-500 font-semibold text-emerald-800 shadow-xs'
                            : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                        }`}
                        id={`wa-dept-picker-${dept.id}`}
                      >
                        <span className="text-sm">
                          {dept.id === 'study' ? '🎓' : dept.id === 'pr' ? '📜' : dept.id === 'work' ? '💼' : '✈️'}
                        </span>
                        <span className="flex-1 truncate">{dept.name}</span>
                        {isSelected && (
                          <span className="text-emerald-600 text-[10px] font-mono font-bold uppercase">Active</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal details & custom text input fields */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-stone-400 uppercase tracking-widest pl-1">
                  2. Add Your Info (Optional)
                </span>
                
                <input
                  type="text"
                  placeholder="Your Full Name"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  className="w-full bg-white text-stone-900 px-3 py-2 rounded-xl text-xs border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium"
                  id="wa-visitor-name-input"
                />

                <textarea
                  placeholder="Custom messages / details (optional)..."
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  rows={2}
                  className="w-full bg-white text-stone-900 p-3 rounded-xl text-xs border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium resize-none"
                  id="wa-visitor-custom-input"
                ></textarea>
              </div>

            </div>

            {/* Action button redirection footer */}
            <div className="bg-white border-t border-stone-100 p-4">
              <button
                onClick={handleRedirect}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center space-x-2 cursor-pointer duration-150 active:scale-98"
                id="wa-redirect-trigger-btn"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Redirect to WhatsApp Consultation</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
