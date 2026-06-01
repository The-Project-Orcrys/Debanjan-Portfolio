"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { INQUIRY_TYPES } from "@/config/site";
import { submitContactForm } from "@/app/actions/contact";
import { trackContactSubmitted } from "@/lib/analytics/events";
import { contactSchema, type ContactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

function inquiryFromSearch(params: URLSearchParams): ContactSchema["projectType"] {
  const raw = params.get("inquiry") ?? params.get("type");
  if (!raw) return "General Inquiry";
  const decoded = decodeURIComponent(raw);
  if (INQUIRY_TYPES.includes(decoded as ContactSchema["projectType"])) {
    return decoded as ContactSchema["projectType"];
  }
  return "General Inquiry";
}

function ContactFormSkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-12 rounded bg-white/5" />
      ))}
      <div className="h-12 w-40 rounded-full bg-white/10" />
    </div>
  );
}

function ContactFormFields() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: "General Inquiry", website: "" },
  });

  useEffect(() => {
    setValue("projectType", inquiryFromSearch(searchParams));
  }, [searchParams, setValue]);

  const onSubmit = async (data: ContactSchema) => {
    setStatus("idle");

    const serverResult = await submitContactForm(data);
    if ("success" in serverResult && serverResult.success) {
      trackContactSubmitted();
      setStatus("success");
      reset();
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      trackContactSubmitted();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute h-0 w-0 opacity-0"
        {...register("website")}
      />
      <div>
        <label className="text-sm text-text-secondary" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="mt-2 w-full border-b border-white/20 bg-transparent py-2 outline-none focus:border-text-accent"
          {...register("name")}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-text-secondary" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="mt-2 w-full border-b border-white/20 bg-transparent py-2 outline-none focus:border-text-accent"
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm text-text-secondary" htmlFor="company">
          Company (optional)
        </label>
        <input
          id="company"
          className="mt-2 w-full border-b border-white/20 bg-transparent py-2 outline-none focus:border-text-accent"
          {...register("company")}
        />
      </div>

      <div>
        <label className="text-sm text-text-secondary" htmlFor="projectType">
          Project type
        </label>
        <select
          id="projectType"
          className="mt-2 w-full border-b border-white/20 bg-transparent py-2 outline-none"
          {...register("projectType")}
        >
          {INQUIRY_TYPES.map((t) => (
            <option key={t} value={t} className="bg-bg-primary">
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-sm text-text-secondary" htmlFor="budget">
            Budget (optional)
          </label>
          <input
            id="budget"
            className="mt-2 w-full border-b border-white/20 bg-transparent py-2 outline-none focus:border-text-accent"
            {...register("budget")}
          />
        </div>
        <div>
          <label className="text-sm text-text-secondary" htmlFor="timeline">
            Timeline (optional)
          </label>
          <input
            id="timeline"
            className="mt-2 w-full border-b border-white/20 bg-transparent py-2 outline-none focus:border-text-accent"
            {...register("timeline")}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-text-secondary" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="mt-2 w-full resize-none border-b border-white/20 bg-transparent py-2 outline-none focus:border-text-accent"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn("contact-cta-primary disabled:opacity-50 disabled:hover:transform-none")}
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>

      {status === "success" && (
        <p className="text-text-accent">Thanks — your message was sent.</p>
      )}
      {status === "error" && (
        <p className="text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<ContactFormSkeleton />}>
      <ContactFormFields />
    </Suspense>
  );
}
