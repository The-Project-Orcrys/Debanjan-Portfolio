import { getCalendarUrl } from "@/lib/site";
import { getResumeUrl } from "@/lib/site.server";
import {
  FounderActionLinks,
  FounderActionTextLinks,
} from "@/components/shared/FounderActionLinks";

type LinkProps = {
  className?: string;
  primary?: boolean;
};

export async function FounderActionLinksServer(props: LinkProps) {
  return (
    <FounderActionLinks
      {...props}
      resumeUrl={getResumeUrl()}
      calendarUrl={getCalendarUrl()}
    />
  );
}

export async function FounderActionTextLinksServer({
  className,
}: {
  className?: string;
}) {
  return (
    <FounderActionTextLinks
      className={className}
      resumeUrl={getResumeUrl()}
      calendarUrl={getCalendarUrl()}
    />
  );
}
