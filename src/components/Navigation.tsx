import { HomeIcon, PlusIcon } from "lucide-react";

export function Navigation({ onPlusClick }: { onPlusClick?: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="bg-white shadow-lg px-8 py-3 pb-6 flex items-center justify-center space-x-8 w-full">
        <button className="focus:outline-none">
          <HomeIcon className="w-6 h-6 text-gray-800" />
        </button>
        <button
          className="bg-[#5662e1] p-4 rounded-2xl -my-6 focus:outline-none"
          onClick={onPlusClick}
        >
          <PlusIcon className="w-4 h-4 text-white" />
        </button>
        <button className="focus:outline-none">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
