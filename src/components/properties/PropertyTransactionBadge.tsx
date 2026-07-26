import { cn } from "@/lib/utils";
import { TRANSACTION_LABELS } from "@/types/property-types";

interface PropertyTransactionBadgeProps {
  readonly isRent: boolean;
  readonly className?: string;
}

export default function PropertyTransactionBadge({
  isRent,
  className,
}: PropertyTransactionBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-md font-semibold text-white",
        isRent ? "bg-rent" : "bg-buy",
        className,
      )}
    >
      {isRent ? TRANSACTION_LABELS.miete : TRANSACTION_LABELS.kauf}
    </span>
  );
}
