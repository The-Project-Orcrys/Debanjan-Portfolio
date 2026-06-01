import { cn } from "@/lib/utils";

interface TextSplitProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
}

export function TextSplit({
  text,
  as: Tag = "p",
  className,
  lineClassName,
}: TextSplitProps) {
  const lines = text.split("\n").filter(Boolean);

  return (
    <Tag className={className}>
      {lines.map((line) => (
        <span
          key={line}
          className="block overflow-hidden"
          aria-label={line}
        >
          <span
            className={cn(
              "text-reveal-line block",
              lineClassName,
            )}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
