import { Key, Home } from 'lucide-react';

import { TRANSACTION_LABELS } from '@/types/property-types';

export default function PropertyLegend() {
  return (
    <div className="flex gap-4 px-2  rounded mb-12 py-1">
      <div className="flex flex-col items-center gap-2">
        <Key className="text-buy" size={14} />
        <span className="text-xs font-medium text-buy">{TRANSACTION_LABELS.kauf}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Home className="text-rent" size={14} />
        <span className="text-xs font-medium text-rent">{TRANSACTION_LABELS.miete}</span>
      </div>
    </div>
  );
}
