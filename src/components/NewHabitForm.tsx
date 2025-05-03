import { useState, useEffect } from "react";
import { X, Briefcase, Zap, User, Wallet, ChefHat, Headphones, Bot, Book, Home, Car, Flame, Carrot, Calendar, Box, Music, Moon } from "lucide-react";

const icons = [
  { name: "briefcase", icon: <Briefcase /> },
  { name: "zap", icon: <Zap /> },
  { name: "user", icon: <User /> },
  { name: "wallet", icon: <Wallet /> },
  { name: "chef", icon: <ChefHat /> },
  { name: "headphones", icon: <Headphones /> },
  { name: "bot", icon: <Bot /> },
  { name: "book", icon: <Book /> },
  { name: "home", icon: <Home /> },
  { name: "car", icon: <Car /> },
  { name: "flame", icon: <Flame /> },
  { name: "carrot", icon: <Carrot /> },
  { name: "calendar", icon: <Calendar /> },
  { name: "box", icon: <Box /> },
  { name: "music", icon: <Music /> },
  { name: "moon", icon: <Moon /> },
];

const iconColors = [
  "bg-yellow-200", "bg-pink-200", "bg-blue-200", "bg-green-200",
  "bg-orange-200", "bg-teal-200", "bg-gray-200", "bg-pink-300",
  "bg-blue-100", "bg-green-100", "bg-orange-100", "bg-blue-50",
  "bg-gray-100", "bg-yellow-100", "bg-pink-100", "bg-blue-300"
];

export function NewHabitForm({ onClose }: { onClose: () => void }) {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [interval, setInterval] = useState("Every day");

  const canCreate = name.trim() && interval && selectedIcon;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <form onSubmit={e => { e.preventDefault(); /* handle create here */ }}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold flex-1 text-center">Let's start a new habit</h2>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type habit name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Description <span className="text-gray-400">(optional)</span>
        </label>
        <input
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Describe a habit"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">
          Intervals <span className="text-red-500">*</span>
        </label>
        <select
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          value={interval}
          onChange={e => setInterval(e.target.value)}
        >
          <option>Every day</option>
          <option>Weekdays</option>
          <option>Weekends</option>
        </select>
      </div>
      <div className="mb-2 font-medium">
        Icon <span className="text-red-500">*</span>
      </div>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {icons.map((item, idx) => (
          <button
            key={item.name}
            className={`rounded-xl p-3 flex items-center justify-center ${iconColors[idx % iconColors.length]} ${selectedIcon === item.name ? 'ring-2 ring-blue-500' : ''}`}
            onClick={e => { e.preventDefault(); setSelectedIcon(item.name); }}
            type="button"
          >
            <span className="text-2xl">{item.icon}</span>
          </button>
        ))}
      </div>
      <button
        type="submit"
        disabled={!canCreate}
        className={`w-full mt-2 py-3 rounded-2xl font-bold text-lg shadow border-2 ${canCreate ? 'bg-lime-400 text-black border-white' : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'}`}
        style={canCreate ? { boxShadow: "0 2px 8px 0 rgba(60,60,100,0.10)" } : {}}
      >
        Create
      </button>
    </form>
  );
} 