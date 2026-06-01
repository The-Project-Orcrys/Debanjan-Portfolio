import { cn } from "@/lib/utils";

export function GlassPanel({
  children,
  className,
  strong = false,
  bordered = false,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  bordered?: boolean;
  as?: "div" | "article" | "aside" | "section";
}) {
  return (
    <Tag
      className={cn(
        "glass-panel",
        strong && "glass-panel--strong",
        bordered && "glass-border",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
