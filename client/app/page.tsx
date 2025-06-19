import {Bell as BellIcon} from 'lucide-react';
export default async function Home() {
  return (
    <div className="flex items-center justify-between w-ful flex-col">
      <div className="flex items-center justify-between w-full p-1 px-6 bg-white
       border-2 border-gray-100 shadow-sm shadow-gray-200">
        <span className="font-bold">Map</span>
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <BellIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
