import { Key, Home } from 'lucide-react';

export default function PropertyLegend() {
  return (
    <div className="flex gap-4 px-2  rounded mb-12 py-1">
      <div className="flex flex-col items-center gap-2">
        <Key className="text-buy" size={14} />
        <span className="text-xs font-medium text-buy">Verkaufen</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Home className="text-rent" size={14} />
        <span className="text-xs font-medium text-rent">Vermieten</span>
      </div>
    </div>
  );
}
