import React from 'react';
import { BookIcon, HomeIcon, MonitorIcon, BrainIcon, WalletIcon, AlarmClockIcon, CheckIcon } from 'lucide-react';
interface HabitCardProps {
  title: string;
  description: string;
  color: string;
  icon: string;
  completed: boolean;
  onToggle: () => void;
}
export function HabitCard({
  title,
  description,
  color,
  icon,
  completed,
  onToggle
}: HabitCardProps) {
  const getIcon = () => {
    switch (icon) {
      case 'book':
        return <BookIcon className="w-5 h-5 text-black" />;
      case 'home':
        return <HomeIcon className="w-5 h-5 text-black" />;
      case 'monitor':
        return <MonitorIcon className="w-5 h-5 text-black" />;
      case 'brain':
        return <BrainIcon className="w-5 h-5 text-black" />;
      case 'wallet':
        return <WalletIcon className="w-5 h-5 text-black" />;
      case 'clock':
        return <AlarmClockIcon className="w-5 h-5 text-black" />;
      default:
        return <BookIcon className="w-5 h-5 text-black" />;
    }
  };
  return <div className={`rounded-2xl p-4 h-[120px] ${color} flex flex-col justify-between transition-transform hover:scale-[0.98] cursor-pointer`} onClick={onToggle}>
      <div className="flex justify-between items-start">
        <div className="p-1 bg-black bg-opacity-10 rounded-md">{getIcon()}</div>
        <button onClick={e => {
        e.stopPropagation();
        onToggle();
      }} className={`w-6 h-6 rounded-full flex items-center justify-center ${completed ? 'bg-black text-white' : 'border-2 border-gray-800 border-opacity-30'}`}>
          {completed && <CheckIcon className="w-4 h-4" />}
        </button>
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
    </div>;
}