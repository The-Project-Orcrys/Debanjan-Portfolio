import { cn } from "@/lib/utils";

export function AvailabilityBadge({
  note,
  className,
}: {
  note: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "availability-badge text-sm",
        className,
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {note}
    </p>
  );
}
