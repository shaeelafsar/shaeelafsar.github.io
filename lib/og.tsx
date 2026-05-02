import { ImageResponse } from "next/og";
import { absoluteUrl, siteConfig } from "@/lib/metadata";

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

export const ogImageContentType = "image/png";

export type OgImageOptions = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
  badges?: string[];
};

export function createOgImage({ eyebrow, title, description, meta = [], badges = [] }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: 36,
          background: "linear-gradient(180deg, #020617 0%, #0f172a 55%, #111827 100%)",
          color: "#f8fafc",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            padding: 48,
            borderRadius: 30,
            overflow: "hidden",
            border: "1px solid rgba(148, 163, 184, 0.22)",
            background: "linear-gradient(160deg, rgba(15, 23, 42, 0.96) 0%, rgba(17, 24, 39, 0.92) 100%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 18% 18%, rgba(37, 99, 235, 0.32), transparent 34%), radial-gradient(circle at 90% 10%, rgba(56, 189, 248, 0.16), transparent 26%), linear-gradient(140deg, rgba(59, 130, 246, 0.08), transparent 42%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 22,
              borderRadius: 24,
              border: "1px solid rgba(148, 163, 184, 0.12)",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22, maxWidth: 920 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    fontSize: 24,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "#93c5fd",
                  }}
                >
                  <div
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 999,
                      background: "linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)",
                    }}
                  />
                  <span>{eyebrow}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 74,
                      fontWeight: 700,
                      lineHeight: 1.04,
                      letterSpacing: "-0.04em",
                      textWrap: "balance",
                    }}
                  >
                    {title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 30,
                      lineHeight: 1.4,
                      color: "#cbd5e1",
                      maxWidth: 860,
                    }}
                  >
                    {description}
                  </div>
                </div>
              </div>
              {badges.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
                  {badges.slice(0, 5).map((badge) => (
                    <div
                      key={badge}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "12px 20px",
                        borderRadius: 999,
                        border: "1px solid rgba(96, 165, 250, 0.3)",
                        background: "rgba(15, 23, 42, 0.72)",
                        fontSize: 24,
                        color: "#dbeafe",
                      }}
                    >
                      {badge}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", fontSize: 28, fontWeight: 600 }}>{siteConfig.name}</div>
                <div style={{ display: "flex", fontSize: 24, color: "#94a3b8" }}>{siteConfig.tagline}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10 }}>
                {meta.map((item) => (
                  <div key={item} style={{ display: "flex", fontSize: 24, color: "#cbd5e1" }}>
                    {item}
                  </div>
                ))}
                <div style={{ display: "flex", fontSize: 22, color: "#64748b" }}>{absoluteUrl()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    ogImageSize,
  );
}
