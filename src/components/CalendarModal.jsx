import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedDate, setSelectedDate } from '../redux/slices/taskSlice';

const CalendarModal = ({ isOpen, onClose, darkMode }) => {
  const dispatch = useDispatch();
  const selectedDateStr = useSelector(getSelectedDate);
  const selectedDate = new Date(selectedDateStr);

  const [viewDate, setViewDate] = useState(new Date(selectedDate));

  const getLocalDateString = (date = new Date()) => {
    const offset = date.getTimezoneOffset();
    const adjusted = new Date(date.getTime() - (offset * 60 * 1000));
    return adjusted.toISOString().split('T')[0];
  };

  const daysFr = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  const monthsFr = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1; // Adjust for Monday start
  };

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleSelectDate = (day) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    // Adjust for timezone to avoid off-by-one errors in toISOString
    const offset = newDate.getTimezoneOffset();
    const adjustedDate = new Date(newDate.getTime() - (offset * 60 * 1000));
    dispatch(setSelectedDate(adjustedDate.toISOString().split('T')[0]));
    onClose();
  };

  const renderDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10 md:h-12 md:w-12"></div>);
    }

    // Actual days
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = 
        selectedDate.getDate() === d && 
        selectedDate.getMonth() === month && 
        selectedDate.getFullYear() === year;
      
      const isToday = 
        new Date().getDate() === d && 
        new Date().getMonth() === month && 
        new Date().getFullYear() === year;

      days.push(
        <button
          key={d}
          onClick={() => handleSelectDate(d)}
          className={`h-10 w-10 md:h-12 md:w-12 rounded-xl flex items-center justify-center text-sm font-bold transition-all relative ${
            isSelected 
              ? (darkMode ? 'bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)] text-white' : 'bg-indigo-600 text-white shadow-lg')
              : (darkMode ? 'hover:bg-white/10 text-white/80' : 'hover:bg-indigo-50 text-slate-700')
          }`}
        >
          {d}
          {isToday && !isSelected && (
            <div className={`absolute bottom-1 w-1 h-1 rounded-full ${darkMode ? 'bg-pink-400' : 'bg-indigo-600'}`}></div>
          )}
        </button>
      );
    }

    return days;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[101] p-6 rounded-[2rem] border shadow-2xl ${
              darkMode ? 'bg-slate-900/90 border-white/10' : 'bg-white border-indigo-100'
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-pink-500/10 text-pink-400' : 'bg-indigo-50 text-indigo-600'}`}>
                  <CalendarIcon size={20} />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    Calendrier
                </h3>
              </div>
              <button 
                onClick={onClose}
                className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-white/10 text-white/40' : 'hover:bg-slate-100 text-slate-400'}`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Month/Year Selector */}
            <div className="flex justify-between items-center mb-6 px-2">
              <button 
                onClick={handlePrevMonth}
                className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-indigo-50 text-indigo-600'}`}
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-center">
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {monthsFr[viewDate.getMonth()]}
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest ${darkMode ? 'text-white/30' : 'text-slate-400'}`}>
                    {viewDate.getFullYear()}
                </div>
              </div>

              <button 
                onClick={handleNextMonth}
                className={`p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-white/5 text-white/60' : 'hover:bg-indigo-50 text-indigo-600'}`}
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysFr.map(d => (
                <div key={d} className={`text-center text-[10px] font-bold uppercase tracking-widest py-2 ${darkMode ? 'text-white/20' : 'text-slate-400'}`}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderDays()}
            </div>

            <button
               onClick={() => {
                   setViewDate(new Date());
                   const today = getLocalDateString();
                   dispatch(setSelectedDate(today));
                   onClose();
               }}
               className={`w-full mt-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                   darkMode 
                   ? 'bg-white/5 hover:bg-white/10 text-white/80 border border-white/10' 
                   : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100'
               }`}
            >
                Aujourd'hui
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CalendarModal;
