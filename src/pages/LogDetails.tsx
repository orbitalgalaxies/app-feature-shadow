import React, { useEffect, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Page: Log Details (opens in new window from LiveMonitor)
// SEO: dynamic title, description, canonical; semantic HTML and single H1

type Level = "info" | "warning" | "error" | "success";

const getLevelColor = (level: Level) => {
  switch (level) {
    case "error":
      return "text-destructive border-destructive";
    case "warning":
      return "text-warning border-warning";
    case "success":
      return "text-success border-success";
    default:
      return "text-info border-info";
  }
};

export default function LogDetails() {
  const { id } = useParams();
  const [params] = useSearchParams();

  const level = (params.get("level") as Level) || "info";
  const message = params.get("message") || "No message provided";
  const timestamp = params.get("timestamp") || "";
  const source = params.get("source") || "";

  const cause = useMemo(() => {
    if (level === "error") {
      switch (source) {
        case "Auth":
          return "Likely invalid credentials, expired session, or provider outage.";
        case "DB":
          return "Possible connection timeout, migration lock, or failing query.";
        case "API":
          return "Upstream 5xx/timeout or schema mismatch.";
        case "System":
          return "Resource limits (CPU/memory) or misconfiguration.";
        case "Payment":
          return "Gateway declined or provider downtime.";
        default:
          return "General runtime error in simulated data.";
      }
    }
    if (level === "warning") return "Degraded performance or non-blocking issue detected.";
    if (level === "success") return "Operation completed as expected.";
    return "Informational telemetry event.";
  }, [level, source]);

  useEffect(() => {
    const title = `Log Details • ${level.toUpperCase()} • ${message.slice(0, 50)}`;
    document.title = title;

    const ensureMeta = (name: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      return el;
    };

    const desc = ensureMeta("description");
    desc.setAttribute(
      "content",
      `Log ${level} from ${source || "Unknown"} at ${timestamp}: ${message}`
    );

    let canonical = document.querySelector("link[rel=\"canonical\"]") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, [level, message, timestamp, source]);

  return (
    <main className="container mx-auto p-6">
      <article className="space-y-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Log Details</h1>
          <Badge variant="outline" className={`${getLevelColor(level)} text-xs`}>
            {level.toUpperCase()}
          </Badge>
        </header>

        <Card className="bg-card border-border shadow-card p-6 space-y-4">
          <section>
            <h2 className="text-sm font-medium text-muted-foreground">Summary</h2>
            <p className="text-foreground mt-1">{message}</p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-accent/40 rounded-md p-3">
              <span className="text-xs text-muted-foreground">Log ID</span>
              <p className="text-sm text-foreground break-all">{id}</p>
            </div>
            <div className="bg-accent/40 rounded-md p-3">
              <span className="text-xs text-muted-foreground">Timestamp</span>
              <p className="text-sm text-foreground">{timestamp || "—"}</p>
            </div>
            <div className="bg-accent/40 rounded-md p-3">
              <span className="text-xs text-muted-foreground">Source</span>
              <p className="text-sm text-foreground">{source || "Unknown"}</p>
            </div>
            <div className="bg-accent/40 rounded-md p-3">
              <span className="text-xs text-muted-foreground">Category</span>
              <p className="text-sm text-foreground capitalize">{level}</p>
            </div>
          </section>

          <section>
            <h2 className="text-sm font-medium text-muted-foreground">Likely cause</h2>
            <p className="text-foreground mt-1">{cause}</p>
          </section>

          <aside className="text-xs text-muted-foreground">
            Note: These logs are simulated for demo purposes; backend tracing not yet connected.
          </aside>
        </Card>

        <nav className="flex items-center gap-3">
          <Link to="/" className="text-sm underline text-foreground">
            Back to dashboard
          </Link>
          <a
            href={window.location.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline text-foreground"
            aria-label="Open this log details in a new tab"
          >
            Open again
          </a>
        </nav>
      </article>
    </main>
  );
}
