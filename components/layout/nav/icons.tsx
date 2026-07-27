/** Icon assets exported from Figma (GNB/SNB, node 12002:2805) and committed
 * locally to /public/nav-icons — the figma.com asset URLs expire after ~7
 * days, so these are downloaded bytes, not hand-authored SVGs. Multi-layer
 * icons (Mac/Linux/Discovery/Edge/M-SecuManager P) keep the exact layered
 * <img> structure Figma exported so the composed glyph stays correct; do not
 * collapse them into a single flattened image without re-checking alignment. */

function Simple({ src, size = 24, alt = "" }: { src: string; size?: number; alt?: string }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, position: "relative" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
      />
    </span>
  );
}

export function WindowsIcon({ size = 18 }: { size?: number }) {
  return <Simple src="/nav-icons/windows-logo.svg" size={size} alt="Windows" />;
}

export function MacIcon({ size = 18 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, position: "relative" }}>
      <span style={{ position: "absolute", inset: "20.82% 8.35% 8.34% 8.32%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/apple-logo-1.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
      <span style={{ position: "absolute", inset: "8.32% 49.99% 70.85% 41.68%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/apple-logo-2.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
    </span>
  );
}

export function LinuxIcon({ size = 18 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, position: "relative" }}>
      <span style={{ position: "absolute", inset: "8.32% 8.35% 58.35% 8.32%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/linux-logo-1.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
      <span style={{ position: "absolute", inset: "58.32% 8.35% 8.35% 8.32%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/linux-logo-1.svg" alt="" style={{ display: "block", width: "100%", height: "100%", transform: "scaleY(-1)" }} />
      </span>
      <span style={{ position: "absolute", top: "25%", bottom: "75%", left: "25%", right: "74.96%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/linux-logo-2.svg" alt="Linux" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
      <span style={{ position: "absolute", top: "75%", bottom: "25%", left: "25%", right: "74.96%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/linux-logo-2.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
    </span>
  );
}

export function DfasProOneIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/dfas-pro-one-icon.svg" size={size} alt="" />;
}

export function DfasEdgeIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/dfas-edge-icon.svg" size={size} alt="" />;
}

export function DfasGoIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/dfas-go-icon.svg" size={size} alt="" />;
}

export function DfasDiscoveryIcon({ size = 24 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, position: "relative" }}>
      <span style={{ position: "absolute", inset: "10% 17.5%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/dfas-discovery-icon-1.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
      <span
        style={{
          position: "absolute",
          inset: "40.42% 30% 30.42% 32.5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ display: "inline-block", transform: "rotate(90deg)", width: "100%", height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/nav-icons/dfas-discovery-icon-2.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
        </span>
      </span>
    </span>
  );
}

export function DfasArcIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/dfas-arc-icon.svg" size={size} alt="" />;
}

export function MsecuPIcon({ size = 40 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, position: "relative" }}>
      <span style={{ position: "absolute", left: "31%", top: "31%", width: "27.6%", height: "5.6%", transform: "rotate(-7deg)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/msecu-p-icon-1.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
      <span style={{ position: "absolute", left: "19.3%", top: "21.7%", width: "65.1%", height: "55.7%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/msecu-p-icon-2.svg" alt="M-SecuManager P" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
    </span>
  );
}

export function MsecuSIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/msecu-s-icon.svg" size={size} alt="" />;
}

export function MsecuGIcon({ size = 29 }: { size?: number }) {
  return <Simple src="/nav-icons/msecu-g-icon.svg" size={size} alt="M-SecuManager G" />;
}

export function GateManagerIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/gatemanager-icon.svg" size={size} alt="" />;
}

export function GateManagerProIcon({ size = 24 }: { size?: number }) {
  return <Simple src="/nav-icons/gatemanager-pro-icon.svg" size={size} alt="" />;
}

export function MoonIcon({ size = 16 }: { size?: number }) {
  return <Simple src="/nav-icons/moon-icon.svg" size={size} alt="" />;
}

export function LanguageIcon({ size = 16 }: { size?: number }) {
  return <Simple src="/nav-icons/language-icon.svg" size={size} alt="" />;
}

export function DownloadIcon({ size = 14 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", width: size, height: size, position: "relative" }}>
      <span style={{ position: "absolute", left: "20.83%", right: "20.83%", top: "58.33%", bottom: "25%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/download-icon-1.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
      <span style={{ position: "absolute", left: "50%", right: "50%", top: "20.83%", bottom: "50%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/download-icon-2.svg" alt="" style={{ display: "block", width: "100%", height: "100%", overflow: "visible" }} />
      </span>
      <span style={{ position: "absolute", inset: "41.67% 37.5% 45.83% 37.5%" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/nav-icons/download-icon-3.svg" alt="" style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
    </span>
  );
}
