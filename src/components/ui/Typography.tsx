import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-sm uppercase tracking-[0.2em] text-text-accent",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  id,
  className,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      id={id}
      className={cn("text-display mt-4 max-w-3xl text-h2", className)}
    >
      {children}
    </Tag>
  );
}

export function Lead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg",
        className,
      )}
    >
      {children}
    </p>
  );
}
