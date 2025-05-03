import React from 'react';
interface DayStripProps {
  selectedDay: number;
  onSelectDay: (day: number) => void;
}
export function DayStrip({
  selectedDay,
  onSelectDay
}: DayStripProps) {
  const days = [{
    number: 11,
    name: 'Mon'
  }, {
    number: 12,
    name: 'Tue'
  }, {
    number: 13,
    name: 'Wed'
  }, {
    number: 14,
    name: 'Thu'
  }, {
    number: 15,
    name: 'Fri'
  }, {
    number: 16,
    name: 'Sat'
  }];
  return <div className="flex justify-between mb-6">
      {days.map((day, index) => <button key={index} onClick={() => onSelectDay(index)} className={`flex flex-col items-center justify-center w-12 h-14 rounded-2xl ${selectedDay === index ? 'bg-black text-white' : index < 2 ? 'bg-[#d5f7a1] text-black' : 'bg-gray-100 text-black'}`}>
          <span className="text-sm font-bold">{day.number}</span>
          <span className="text-xs">{day.name}</span>
        </button>)}
    </div>;
}