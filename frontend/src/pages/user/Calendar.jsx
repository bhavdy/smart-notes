import React, { useState, useEffect } from 'react';
import { 
  format, addMonths, subMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays 
} from 'date-fns';
import { noteService } from '../../services/noteService';
import { ChevronLeft, ChevronRight, Calendar as CalIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const data = await noteService.getAll();
        setNotes(data || []);
      } catch (error) {
        toast.error('Failed to load calendar notes');
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const onDateClick = (day) => setSelectedDate(day);

  const getNotesForDay = (day) => {
    return notes.filter(n => isSameDay(new Date(n.createdAt), day));
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <CalIcon className="mr-3 text-indigo-500" />
          {format(currentDate, 'MMMM yyyy')}
        </h1>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="btn btn-icon bg-gray-100 hover:bg-gray-200"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="btn btn-icon bg-gray-100 hover:bg-gray-200"><ChevronRight size={20} /></button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold text-sm text-gray-500 py-2">
          {format(addDays(startDate, i), 'EEE')}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const dayNotes = getNotesForDay(day);

        days.push(
          <div
            key={day}
            onClick={() => onDateClick(cloneDay)}
            className={`min-h-[100px] p-2 border border-gray-100 transition cursor-pointer flex flex-col
              ${!isSameMonth(day, monthStart) ? 'bg-gray-50 text-gray-400' : 'bg-white'}
              ${isSameDay(day, selectedDate) ? 'ring-2 ring-indigo-500 z-10' : 'hover:bg-indigo-50'}
              ${isSameDay(day, new Date()) ? 'font-bold' : ''}
            `}
          >
            <span className={`text-right w-full block ${isSameDay(day, new Date()) ? 'text-indigo-600' : ''}`}>{formattedDate}</span>
            <div className="flex-1 flex flex-col gap-1 mt-1 overflow-hidden">
              {dayNotes.slice(0, 3).map((n, idx) => (
                <div key={idx} className="text-xs bg-indigo-100 text-indigo-700 px-1 py-0.5 rounded truncate" title={n.title}>
                  {n.title}
                </div>
              ))}
              {dayNotes.length > 3 && <div className="text-xs text-gray-500 font-medium">+{dayNotes.length - 3} more</div>}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div className="grid grid-cols-7" key={day}>{days}</div>);
      days = [];
    }
    return <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">{rows}</div>;
  };

  const selectedDayNotes = getNotesForDay(selectedDate);

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>
      
      <div className="w-full lg:w-80 flex flex-col">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">Notes for {format(selectedDate, 'MMM do, yyyy')}</h2>
        <div className="flex-1 overflow-y-auto pr-2">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : selectedDayNotes.length === 0 ? (
            <p className="text-gray-500 italic">No notes created on this day.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {selectedDayNotes.map(note => (
                <Link to={`/notes/${note._id}`} key={note._id} className="card p-4 hover:border-indigo-300 transition border border-transparent bg-white shadow-sm block">
                  <h4 className="font-semibold text-indigo-900 mb-1">{note.title || 'Untitled'}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">{note.content}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
