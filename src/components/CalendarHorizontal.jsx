import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedDate, setSelectedDate } from '../redux/slices/taskSlice';
import CalendarModal from './CalendarModal';

const CalendarHorizontal = ({ darkMode }) => {
  const dispatch = useDispatch();
  const selectedDateStr = useSelector(getSelectedDate);
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getLocalDateString = (date = new Date()) => {
    const offset = date.getTimezoneOffset();
    const adjusted = new Date(date.getTime() - (offset * 60 * 1000));
    return adjusted.toISOString().split('T')[0];
  };

  // Generate an array of dates (e.g., 3 days ago to 14 days ahead)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = -7; i <= 21; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();
  
  // Create an array of short French day names
  const daysFr = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  const monthsFr = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

  useEffect(() => {
    // Optionally Auto-scroll to current day on mount
    if (scrollRef.current) {
      const activeEl = scrollRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, []); // Run once on mount

  return (
    <div className="w-full mb-8 relative flex items-center gap-2">
      <div className="relative flex-1 group overflow-hidden rounded-2xl">
        {/* Fade edges */}
        <div className={`absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r ${darkMode ? 'from-[#0f172a] to-transparent' : 'from-indigo-600/30 to-transparent'}`}></div>
        <div className={`absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-l ${darkMode ? 'from-[#0f172a] to-transparent' : 'from-fuchsia-600/30 to-transparent'}`}></div>

        <div 
          ref={scrollRef}
          className="flex space-x-3 overflow-x-auto py-2 px-8 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dates.map((date, index) => {
            const formattedDate = getLocalDateString(date);
            const isActive = formattedDate === selectedDateStr;
            
            const isToday = getLocalDateString() === formattedDate;

            return (
              <button
                key={formattedDate}
                data-active={isActive}
                onClick={() => dispatch(setSelectedDate(formattedDate))}
                className={`relative flex flex-col items-center justify-center min-w-[64px] h-20 rounded-2xl transition-colors duration-300 snap-center outline-none shrink-0 ${
                  !isActive && darkMode ? 'hover:bg-white/5' : ''
                } ${!isActive && !darkMode ? 'hover:bg-black/10' : ''}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCalendarPill"
                    className={`absolute inset-0 rounded-2xl ${
                      darkMode 
                        ? 'bg-gradient-to-b from-indigo-500/80 to-pink-500/80 shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                        : 'bg-white shadow-lg border border-indigo-100'
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <span className={`relative z-10 text-xs font-medium uppercase tracking-wider mb-1 ${
                  isActive 
                    ? (darkMode ? 'text-white' : 'text-indigo-600') 
                    : (darkMode ? 'text-white/40' : 'text-white/80')
                }`}>
                  {daysFr[date.getDay()]}
                </span>

                <span className={`relative z-10 text-xl font-bold ${
                  isActive 
                    ? (darkMode ? 'text-white' : 'text-indigo-900') 
                    : (darkMode ? 'text-white/80' : 'text-white')
                }`}>
                  {date.getDate()}
                </span>

                {isToday && !isActive && (
                  <div className={`absolute bottom-2 w-1 h-1 rounded-full ${darkMode ? 'bg-pink-500' : 'bg-white'}`}></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Button to open Full Calendar */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`flex-shrink-0 w-16 h-20 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 border ${
          darkMode 
            ? 'bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10' 
            : 'bg-white/40 border-indigo-100 text-indigo-600/60 hover:text-indigo-600 hover:bg-white'
        }`}
        title="Ouvrir le calendrier complet"
      >
        <Calendar size={24} />
        <span className="text-[10px] font-bold uppercase tracking-tighter mt-1">Tous</span>
      </button>

      <CalendarModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        darkMode={darkMode} 
      />
    </div>
  );
};

export default CalendarHorizontal;
