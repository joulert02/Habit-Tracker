import React from 'react';
import { MonitorIcon, BellIcon } from 'lucide-react';
interface HeaderProps {
  name: string;
}
export function Header({
  name
}: HeaderProps) {
  return <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-lg font-medium text-gray-800">Good morning,</h2>
        <h1 className="text-4xl font-bold text-gray-900">{name}</h1>
      </div>
      <div className="flex space-x-4 mt-2">
        <button className="focus:outline-none">
          <MonitorIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button className="focus:outline-none relative">
          <BellIcon className="w-6 h-6 text-gray-800" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-orange-400 rounded-full"></span>
        </button>
      </div>
    </div>;
}