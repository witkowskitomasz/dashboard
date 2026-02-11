import { 
  format, 
  getISODay, 
  startOfMonth, 
  getDaysInMonth, 
  addMonths, 
  subMonths, 
  isToday, 
  isSameDay,
  set
} from "date-fns";
import { enUS } from "date-fns/locale";
import React, { useState } from "react";

export default function Calendar() {
  // viewDate steruje tym, jaki miesiąc widzimy w siatce
  const [viewDate, setViewDate] = useState(new Date());
  // selectedDate to dzień, który został kliknięty
  const [selectedDate, setSelectedDate] = useState(new Date());

  const firstDayOfMonth = startOfMonth(viewDate);
  const daysInMonth = getDaysInMonth(viewDate);
  const offset = getISODay(firstDayOfMonth) - 1;
  const rows = Math.ceil((daysInMonth + offset) / 7);

  const nextMonth = () => setViewDate(addMonths(viewDate, 1));
  const prevMonth = () => setViewDate(subMonths(viewDate, 1));

  return (
    <div className="flex flex-col items-center justify-center m-4 p-8 text-2xl text-slate-200">
      {/* TWOJE STYLOWANIE NAGŁÓWKA */}
      <div className="flex bg-slate-700/50 p-8 rounded-xl flex-col items-center gap-y-4">
        <p className="text-5xl font-bold">{format(viewDate, "MMMM", { locale: enUS })}</p>
        <p className="font-bold text-2xl text-slate-700">
          {format(selectedDate, "dd-MMMM-yy")}
        </p>
        <p className="text-xl">{format(selectedDate, "EEEE", { locale: enUS })}</p>
      </div>

      {/* TWOJE PRZYCISKI NAWIGACJI */}
      <div className="flex text-slate-200 gap-x-4 mt-4">
        <div onClick={prevMonth} className="bg-slate-700 py-4 px-8 rounded-xl cursor-pointer hover:bg-slate-700/70">
          &lt;
        </div>
        <div onClick={nextMonth} className="bg-slate-700 py-4 px-8 rounded-xl cursor-pointer hover:bg-slate-700/70">
          &gt;
        </div>
      </div>

      <div>
        <table className="border-2 border-slate-700 mt-8 text-slate-700">
          <thead className="flex items-center justify-center border-2 border-slate-700 py-4">
            <tr className="flex gap-x-6">
              <th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th>
            </tr>
          </thead>
          <tbody className="flex flex-col gap-y-4 p-4">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="flex gap-x-4">
                {Array.from({ length: 7 }).map((_, colIndex) => {
                  const dayNumber = rowIndex * 7 + colIndex - offset + 1;
                  const isEmpty = dayNumber <= 0 || dayNumber > daysInMonth;

                  // Tworzymy obiekt daty dla tej konkretnej komórki do porównań
                  const cellDate = !isEmpty ? set(viewDate, { date: dayNumber }) : null;
                  
                  // LOGIKA STANÓW:
                  const isCurrentToday = cellDate && isToday(cellDate);
                  const isCurrentSelected = cellDate && isSameDay(cellDate, selectedDate);

                  return (
                    <td
                      key={colIndex}
                      onClick={() => !isEmpty && setSelectedDate(cellDate)}
                      className={`
                        w-12 h-12 flex items-center justify-center border-2 rounded-full 
                        ${isEmpty ? 'border-transparent opacity-0' : 'border-slate-700 cursor-pointer'}
                        
                        /* DZISIAJ: Niebieska obramówka */
                        ${isCurrentToday ? 'border-slate-200' : ''}
                        
                        /* WYBRANY: Niebieskie tło */
                        ${isCurrentSelected ? 'bg-slate-400 border-blue-600' : 'hover:bg-slate-700/70'}
                      `}
                    >
                      {!isEmpty && dayNumber}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}