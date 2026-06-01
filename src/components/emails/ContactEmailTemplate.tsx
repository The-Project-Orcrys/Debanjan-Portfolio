import type { ContactSchema } from "@/lib/validation";

export function ContactEmailTemplate(data: ContactSchema) {
  return (
    <div style={{ fontFamily: "sans-serif", color: "#0a0a0a" }}>
      <h1 style={{ fontSize: "20px" }}>New portfolio inquiry</h1>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      {data.company ? (
        <p>
          <strong>Company:</strong> {data.company}
        </p>
      ) : null}
      <p>
        <strong>Project type:</strong> {data.projectType}
      </p>
      {data.budget ? (
        <p>
          <strong>Budget:</strong> {data.budget}
        </p>
      ) : null}
      {data.timeline ? (
        <p>
          <strong>Timeline:</strong> {data.timeline}
        </p>
      ) : null}
      <p>
        <strong>Message:</strong>
      </p>
      <p style={{ whiteSpace: "pre-wrap" }}>{data.message}</p>
    </div>
  );
}
