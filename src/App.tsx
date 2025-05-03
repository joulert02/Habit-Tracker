import React, { useState } from 'react';
import { Header } from './components/Header';
import { DayStrip } from './components/DayStrip';
import { HabitList } from './components/HabitList';
import { Navigation } from './components/Navigation';
export function App() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (index 2) selected by default
  return <div className="flex flex-col w-full min-h-screen bg-[#e3e6ff]">
      <div className="max-w-md w-full mx-auto flex-1 relative px-4 py-8">
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg p-5 pt-10 pb-20 min-h-[90vh]">
          <Header name="Diana" />
          <DayStrip selectedDay={selectedDay} onSelectDay={setSelectedDay} />
          <HabitList selectedDay={selectedDay} />
          <HabitList selectedDay={selectedDay} />
          <HabitList selectedDay={selectedDay} />
        </div>
        <Navigation />
      </div>
    </div>;
}