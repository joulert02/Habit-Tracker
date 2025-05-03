import React, { useState } from 'react';
import { HabitCard } from './HabitCard';
interface HabitListProps {
  selectedDay: number;
}
export function HabitList({
  selectedDay
}: HabitListProps) {
  const [habits, setHabits] = useState([{
    id: 1,
    title: 'Reading',
    description: 'Read 20 pages',
    color: 'bg-[#ffd580]',
    icon: 'book',
    completed: false,
    days: [0, 1, 2, 3, 4, 5]
  }, {
    id: 2,
    title: 'Household',
    description: 'Make bed in the morning',
    color: 'bg-[#d5f7a1]',
    icon: 'home',
    completed: true,
    days: [0, 1, 2, 4, 5]
  }, {
    id: 3,
    title: 'Programming',
    description: 'Write mini-games in C#',
    color: 'bg-gray-200',
    icon: 'monitor',
    completed: true,
    days: [1, 2, 3, 5]
  }, {
    id: 4,
    title: 'Positive thinking',
    description: 'Write 10 affirmations',
    color: 'bg-[#b3d4ff]',
    icon: 'brain',
    completed: false,
    days: [0, 2, 4]
  }, {
    id: 5,
    title: 'Financial literacy',
    description: 'Record all expenses',
    color: 'bg-[#ffc0cb]',
    icon: 'wallet',
    completed: false,
    days: [0, 1, 2, 3, 4, 5]
  }, {
    id: 6,
    title: 'Sleep routine',
    description: 'Sleep for 8 hours',
    color: 'bg-gray-100',
    icon: 'clock',
    completed: false,
    days: [0, 1, 2, 3, 4, 5]
  }]);
  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => habit.id === id ? {
      ...habit,
      completed: !habit.completed
    } : habit));
  };
  const filteredHabits = habits.filter(habit => habit.days.includes(selectedDay));
  return <div className="overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
      <div className="flex space-x-4" style={{
      paddingRight: '50%'
    }}>
        {filteredHabits.map(habit => <div key={habit.id} className="flex-none w-[280px]">
            <HabitCard title={habit.title} description={habit.description} color={habit.color} icon={habit.icon} completed={habit.completed} onToggle={() => toggleHabit(habit.id)} />
          </div>)}
      </div>
    </div>;
}