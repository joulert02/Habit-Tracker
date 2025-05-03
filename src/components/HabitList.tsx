import { useState } from "react";
import { HabitCard } from "./HabitCard";

interface Habit {
  id: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  completed: boolean;
  days: number[];
}

interface HabitListProps {
  selectedDay: number;
  habits: Habit[];
  onToggle: (id: number) => void;
}

const defaultHabits: Habit[] = [
  {
    id: 1,
    title: "Reading",
    description: "Read 20 pages",
    color: "bg-[#ffd580]",
    icon: "book",
    completed: false,
    days: [0, 1, 2, 3, 4, 5],
  },
  {
    id: 2,
    title: "Household",
    description: "Make bed in the morning",
    color: "bg-[#d5f7a1]",
    icon: "home",
    completed: true,
    days: [0, 1, 2, 4, 5],
  },
];

export function HabitList({
  selectedDay,
  habits = defaultHabits,
  onToggle,
}: HabitListProps) {
  const filteredHabits = habits.filter((habit) =>
    habit.days.includes(selectedDay)
  );

  return (
    <div className="overflow-x-auto pb-4 -mx-5 px-5 scrollbar-hide">
      <div
        className="flex space-x-4"
        style={{
          paddingRight: "50%",
        }}
      >
        {filteredHabits.map((habit) => (
          <div key={habit.id} className="flex-none w-[210px]">
            <HabitCard
              title={habit.title}
              description={habit.description}
              color={habit.color}
              icon={habit.icon}
              completed={habit.completed}
              onToggle={() => onToggle(habit.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
