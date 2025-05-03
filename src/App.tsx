import { useState } from "react";
import { Header } from "./components/Header";
import { DayStrip } from "./components/DayStrip";
import { HabitList } from "./components/HabitList";
import { Navigation } from "./components/Navigation";
import { BottomDrawer } from "./components/BottomDrawer";
import { NewHabitForm } from "./components/NewHabitForm";

export function App() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (index 2) selected by default
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onToggle = (habitId: number) => {
    console.log(habitId);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#e3e6ff]">
      <div className="bg-white overflow-hidden shadow-lg p-5 pt-10 pb-20 min-h-[100vh]">
        <Header name="Diana" />
        <DayStrip selectedDay={selectedDay} onSelectDay={setSelectedDay} />
        <HabitList
          selectedDay={selectedDay}
          habits={[
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
          ]}
          onToggle={onToggle}
        />
        <HabitList
          selectedDay={selectedDay}
          habits={[
            {
              id: 3,
              title: "Programming",
              description: "Write mini-games in C#",
              color: "bg-gray-200",
              icon: "monitor",
              completed: true,
              days: [1, 2, 3, 5],
            },
            {
              id: 4,
              title: "Positive thinking",
              description: "Write 10 affirmations",
              color: "bg-[#b3d4ff]",
              icon: "brain",
              completed: false,
              days: [0, 2, 4],
            },
          ]}
          onToggle={onToggle}
        />
        <HabitList
          selectedDay={selectedDay}
          habits={[
            {
              id: 5,
              title: "Financial literacy",
              description: "Record all expenses",
              color: "bg-[#ffc0cb]",
              icon: "wallet",
              completed: false,
              days: [0, 1, 2, 3, 4, 5],
            },
            {
              id: 6,
              title: "Sleep routine",
              description: "Sleep for 8 hours",
              color: "bg-gray-100",
              icon: "clock",
              completed: false,
              days: [0, 1, 2, 3, 4, 5],
            },
          ]}
          onToggle={onToggle}
        />
      </div>
      <Navigation onPlusClick={() => setIsDrawerOpen(true)} />
      <BottomDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        previewOffset={0}
      >
        <NewHabitForm onClose={() => setIsDrawerOpen(false)} />
      </BottomDrawer>
    </div>
  );
}
