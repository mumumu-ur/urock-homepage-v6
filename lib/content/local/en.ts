import type { DetailPage, HomeContent } from "../schema";

export const homeEn: HomeContent = {
  hero: {
    badge: "AI DIGITAL FORENSICS · ON-SITE RISK INTELLIGENCE",
    title: [
      { text: "We " },
      { text: "connect", accent: true },
      { text: " scattered digital traces\nto reveal the " },
      { text: "hidden value", accent: true },
      { text: " of data." },
    ],
    lead: "UROCK is an AI digital forensics company delivering on-site forensics, remote PC inspection, smart-device media trace analysis, verified data erasure, and expert services.",
    monoNote:
      "// We build air-gapped, on-device AI forensics designed even for sites with restricted connectivity.",
    primaryCta: { label: "Explore solutions →", targetId: "cC-solutions" },
    secondaryCta: { label: "Talk to us", targetId: "cC-contact" },
    readout: {
      header: "EVIDENCE_STREAM",
      status: "● ANALYZING",
      rows: [
        { label: "FILE ACTIVITY", value: "TRACE FOUND", tone: "blue" },
        { label: "TIMELINE", value: "RECONSTRUCTED", tone: "blue" },
        { label: "DEVICE CONNECTION", value: "CONNECTED", tone: "teal" },
        { label: "LOCAL AI", value: "LOCAL PROCESSING", tone: "teal" },
        { label: "REPORT", value: "READY", tone: "bright" },
      ],
      legendLow: "LOW DENSITY",
      legendHigh: "REALITY CORE",
    },
    scope: [
      { index: "01 · DIGITAL FORENSICS", label: "PC & system record analysis", href: "#cC-solutions" },
      { index: "02 · MEDIA INSPECTION", label: "Smart-device capture & media trace inspection", href: "#cC-solutions" },
      { index: "03 · DATA ERASURE", label: "Smart-device erasure & verified results", href: "#cC-solutions" },
    ],
  },
  process: {
    kicker: "// PROCESS_PIPELINE",
    title: "Clue → Relation → Connection → Truth",
    desc: "Every data point converges into a single fact with gravity. We visualize data density and relationships with False-Color.",
    steps: [
      { step: "STEP_01", title: "Discover", desc: "Find clues easily missed at the boundary." },
      { step: "STEP_02", title: "Organize", desc: "Bring fragmented records into structure." },
      { step: "STEP_03", title: "Connect", desc: "Link relationships of time, action, and data." },
      { step: "STEP_04", title: "Prove", desc: "Complete it into actionable facts and value.", highlight: true },
    ],
  },
  scenarios: {
    kicker: "// FIELD_SCENARIOS · 02",
    title: [{ text: "What security risk are you\nfacing right now?" }],
    desc: "Choose a situation to connect with the relevant solutions and services.",
    items: [
      { icon: "person_off", title: "Insider data leakage", desc: "When leavers or key staff are suspected of taking confidential files", href: "#cC-solutions" },
      { icon: "travel_explore", title: "Remote & overseas audits", desc: "Ongoing inspection of branch, overseas, and remote PCs", href: "#cC-solutions" },
      { icon: "wifi_off", title: "Air-gapped field investigation", desc: "Evidence collection where external networks are unavailable", href: "#cC-solutions" },
      { icon: "photo_camera", title: "Continuous media scan", desc: "Prevent capture and leakage by external workers and partners", href: "#cC-solutions" },
      { icon: "manage_search", title: "User activity tracing", desc: "Investigate file access traces and intrusion paths", href: "#cC-solutions" },
      { icon: "smartphone", title: "Asset return & disposal", desc: "Secure return and safe wipe of corporate smart devices", href: "#cC-solutions" },
      { icon: "gavel", title: "Securing legal evidence", desc: "Forensic evidence analysis for litigation and disputes", href: "#cC-services" },
      { icon: "school", title: "Training experts", desc: "Customized forensic training for security staff", href: "#cC-services" },
    ],
  },
  personas: {
    kicker: "// ORGANIZATION_PROFILE · 03",
    title: [{ text: "Find the entry point\nthat fits your organization." }],
    items: [
      { icon: "account_balance", iconColor: "var(--brand-blue)", title: "Law enforcement & public audit", desc: "Precise investigation in air-gapped environments, from multi-OS analysis to unallocated-space timelines.", tag: "→ DFAS Pro One", href: "#cC-solutions" },
      { icon: "gavel", iconColor: "var(--brand-blue)", title: "Enterprise audit & legal", desc: "Automatically classify e-Discovery evidence from vast unstructured data into finished reports.", tag: "→ DFAS Discovery", href: "#cC-solutions" },
      { icon: "groups", iconColor: "var(--brand-blue)", title: "SMB security", desc: "Even non-experts can quickly triage key risks with natural-language search.", tag: "→ DFAS Go", href: "#cC-solutions" },
      { icon: "science", iconColor: "#B7A5FF", title: "Labs, manufacturing, secure zones", desc: "Control camera capture without security stickers, blocking leakage from the entrance.", tag: "→ GateManager", href: "#cC-solutions" },
      { icon: "inventory_2", iconColor: "var(--brand-accent)", title: "Asset & general affairs", desc: "Eliminate legal risk with complete erasure and permanent-deletion evidence on return or disposal.", tag: "→ M-SecuManager", href: "#cC-solutions" },
      { icon: "support_agent", iconColor: "var(--brand-accent)", title: "When you need expert services", desc: "UROCK experts perform diagnosis, forensic analysis, training, and secure erasure directly.", tag: "→ Expert services", href: "#cC-services", highlight: true },
    ],
  },
  solutions: {
    kicker: "// SOLUTION_PORTFOLIO · 04",
    title: [{ text: "Different product lines,\none structure that leads to truth." }],
    desc: "Analyze records, block leakage, and prove erasure. Select a product line on the right.",
    slides: [
      {
        id: "dfas",
        kicker: "RECORD · DIGITAL FORENSICS",
        series: "DFAS Series",
        title: "On-device AI forensics that works even when the internet is down",
        desc: "Discover and organize digital records to confirm the context of events and actions. An AI digital forensics line built even for air-gapped environments.",
        points: [
          "DFAS Pro One · All-OS unified forensics for air-gapped environments",
          "DFAS Edge · High-speed collection & indexing hardware for field audits",
          "DFAS Go · Triage internal risk signals with natural-language search",
          "DFAS Discovery · Automatic evidence classification & submission-ready reports",
          "DFAS Arc · AI archiving with document classification & confidentiality detection",
        ],
        cta: { label: "Talk to us →", targetId: "cC-contact" },
      },
      {
        id: "gatemanager",
        kicker: "CONNECT · MEDIA INSPECTION",
        series: "GateManager Series",
        title: "Perfect access control without security stickers, blocking leakage at the source",
        desc: "Connect the relationship of device, time, and capturable actions into a verifiable flow. Control illegal capture and technology leakage in facilities, labs, and secure zones.",
        points: [
          "GateManager · Intelligent control of camera capture without security stickers",
          "GateManager Pro · Central monitoring and forensic logging across many endpoints",
        ],
        cta: { label: "Talk to us →", targetId: "cC-contact" },
      },
      {
        id: "m-secumanager",
        kicker: "VERIFY · DATA ERASURE",
        series: "M-SecuManager Series",
        title: "Complete, flawless erasure that leaves not a single bit of trace",
        desc: "Verify and record erasure results to complete trust in data handling. Compliant with NIS and the global DoD 5220.22-M secure-erasure standards.",
        points: [
          "M-SecuManager P · Portable package optimized for on-site erasure",
          "M-SecuManager S · Remote simultaneous erasure & central monitoring for many devices",
          "M-SecuManager G · Standalone kiosk for self return & permanent-deletion evidence",
        ],
        cta: { label: "Talk to us →", targetId: "cC-contact" },
      },
      {
        id: "services",
        kicker: "SERVICE · EXPERT OPERATIONS",
        series: "Expert services",
        title: "Action-centered expert services built on 10 years of UROCK know-how",
        desc: "Even without adopting a product, our experts directly perform diagnosis, analysis, training, and erasure to complement your security capabilities.",
        points: [
          "Security diagnosis · Precise diagnosis down to intrusion artifacts",
          "Digital forensic analysis · Legally valid evidence analysis & expert reports",
          "Forensic & security training · Transfer of investigation-grade practical skills",
          "Secure erasure · Expert permanent-deletion service & certificate issuance",
        ],
        cta: { label: "See services →", targetId: "cC-services" },
      },
    ],
  },
  servicesSection: {
    kicker: "// EXPERT_SERVICES · 05",
    title: [{ text: "Beyond products,\ntrust performed by people." }],
    items: [
      { icon: "policy", title: "Security diagnosis", desc: "Beyond infrastructure vulnerability checks, precise diagnosis down to attacker intrusion artifacts from a forensic perspective." },
      { icon: "plagiarism", title: "Digital forensic analysis", desc: "Legally valid evidence analysis and court-ready expert reports for embezzlement, tech leakage, or HR incidents." },
      { icon: "school", title: "Forensic & security training", desc: "Transfer of investigation-grade forensic skills and customized security-awareness curricula for staff." },
      { icon: "delete_forever", title: "Secure erasure", desc: "Expert permanent-deletion service and official certificate issuance on asset return or disposal, eliminating legal risk." },
    ],
  },
  trust: {
    kicker: "// TECHNOLOGY_TRUST · 06",
    title: [{ text: "Built on proven technology and standards." }],
    items: [
      { label: "CERTIFICATION", name: "Certification", desc: "Trust grounded in information-security and quality certification systems.", color: "var(--brand-accent)" },
      { label: "PATENT", name: "Patents", desc: "Patents held and filed for forensics and data-processing technology.", color: "var(--brand-blue)" },
      { label: "STANDARD", name: "Erasure standard", desc: "Compliant with NIS and DoD 5220.22-M secure-erasure specs.", color: "#B7A5FF" },
      { label: "AWARDS", name: "Awards", desc: "Recognized across multiple fields for technology and product quality.", color: "var(--brand-accent-bright)" },
    ],
  },
  global: {
    kicker: "// GLOBAL_DEPLOYMENT · 07",
    title: [{ text: "The data universe\nexpands beyond borders." }],
    desc: "Select a node to view UROCK's regional presence.",
    regions: [
      { code: "KR", key: "kr", name: "South Korea", role: "HEADQUARTERS · R&D", desc: "Headquarters and R&D hub. Leads AI digital forensics product development and domestic forensics & security services.", x: 80.3, y: 42.7 },
      { code: "SA", key: "sa", name: "Saudi Arabia", role: "GLOBAL PARTNER REGION", desc: "Middle East partnership hub. Advancing supply of forensics & security solutions tailored to local environments.", x: 25, y: 54.2 },
      { code: "OM", key: "om", name: "Oman", role: "GLOBAL PARTNER REGION", desc: "Middle East partnership hub. Cooperating on solutions for public and enterprise security demand.", x: 32.9, y: 50 },
      { code: "IN", key: "in", name: "India", role: "GLOBAL PARTNER REGION", desc: "South Asia partnership hub. Responding to data security & forensics demand of large organizations.", x: 52.6, y: 62.5 },
      { code: "TW", key: "tw", name: "Taiwan", role: "GLOBAL PARTNER REGION", desc: "East Asia partnership hub. Advancing information-security cooperation for manufacturing & research.", x: 77.4, y: 55.8 },
    ],
  },
  partners: {
    kicker: "// PARTNERS · CUSTOMERS · 08",
    items: ["Law enforcement", "Public sector", "Finance", "Manufacturing & R&D", "Enterprise", "Legal"],
  },
  news: {
    kicker: "// UROCK_NEWS · 09",
    title: [{ text: "UROCK NEWS" }],
    filters: [
      { id: "all", label: "All" },
      { id: "news", label: "News" },
      { id: "product", label: "Product" },
      { id: "expo", label: "Events" },
    ],
    items: [
      { id: "n1", category: "news", categoryLabel: "News", tag: "Press", date: "2025.03.14", title: "DFAS Edge on-device AI forensics technology development", href: "#" },
      { id: "n2", category: "product", categoryLabel: "Product", tag: "Update", date: "2025.02.27", title: "DFAS Discovery automatic report generation update", href: "#" },
      { id: "n3", category: "expo", categoryLabel: "Events", tag: "Exhibition", date: "2025.02.05", title: "Participation in domestic and overseas security expos", href: "#" },
      { id: "n4", category: "news", categoryLabel: "News", tag: "Press", date: "2025.01.18", title: "UROCK signs on-device forensics supply contract with a national agency", href: "#" },
      { id: "n5", category: "product", categoryLabel: "Product", tag: "Update", date: "2024.12.30", title: "GateManager adds newly supported devices to its complete-wipe algorithm", href: "#" },
      { id: "n6", category: "expo", categoryLabel: "Events", tag: "Exhibition", date: "2024.11.22", title: "Recap of our booth at the Digital Forensics Conference 2024", href: "#" },
    ],
  },
  contactCta: {
    kicker: "RECORD · CONNECT · VERIFY · 10",
    title: [{ text: "Turn scattered traces\ninto actionable results." }],
    desc: "From 1:1 security diagnosis tailored to your environment to product adoption, demos, quotes and brochures, UROCK experts design it with you.",
    cta: { label: "Talk to us", href: "contact" },
  },
};

export const solutionsEn: DetailPage[] = [
  {
    slug: "dfas",
    kicker: "RECORD · DIGITAL FORENSICS",
    name: "DFAS Series",
    summary: "On-device AI digital forensics that works even when the internet is down.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["Discover and organize digital records to confirm the context of events and actions.", "An AI digital forensics line built even for air-gapped environments."] },
      { id: "features", label: "Features", heading: "Key features", body: ["DFAS Pro One · All-OS unified forensics", "DFAS Edge · High-speed collection & indexing hardware", "DFAS Go · Natural-language triage collection", "DFAS Discovery · e-Discovery auto classification & reports", "DFAS Arc · AI archiving with confidentiality detection"] },
      { id: "benefits", label: "Benefits", heading: "Benefits", body: ["Fast evidence collection even in air-gapped/field environments.", "Natural-language analysis usable by non-experts.", "Auto-completed submission-ready reports."] },
    ],
    links: [{ label: "View DFAS Pro One", href: "/en/solutions/dfas/pro-one" }],
  },
  {
    slug: "gatemanager",
    kicker: "CONNECT · MEDIA INSPECTION",
    name: "GateManager Series",
    summary: "Perfect access control without security stickers, blocking leakage at the source.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["Connect the relationship of device, time, and capturable actions into a verifiable flow.", "Control illegal capture and technology leakage in facilities, labs, and secure zones."] },
      { id: "features", label: "Features", heading: "Key features", body: ["GateManager · Intelligent camera-capture control", "GateManager Pro · Central monitoring & forensic logging"] },
      { id: "benefits", label: "Benefits", heading: "Benefits", body: ["Block leakage from the entrance.", "Early response to risk with real-time monitoring."] },
    ],
  },
  {
    slug: "m-secumanager",
    kicker: "VERIFY · DATA ERASURE",
    name: "M-SecuManager Series",
    summary: "Complete, flawless erasure that leaves not a single bit of trace.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["Verify and record erasure results to complete trust in data handling.", "Compliant with NIS and DoD 5220.22-M secure-erasure standards."] },
      { id: "features", label: "Features", heading: "Key features", body: ["M-SecuManager P · Portable on-site erasure package", "M-SecuManager S · Remote simultaneous erasure & monitoring", "M-SecuManager G · Self-return kiosk with evidence issuance"] },
      { id: "benefits", label: "Benefits", heading: "Benefits", body: ["Eliminate legal risk with permanent-deletion evidence.", "Efficient erasure operations for large device fleets."] },
    ],
  },
];

export const servicesEn: DetailPage[] = [
  {
    slug: "security-diagnosis",
    kicker: "EXPERT SERVICE",
    name: "Security diagnosis",
    summary: "Precise diagnosis from infrastructure vulnerabilities down to intrusion artifacts.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["We diagnose down to attacker intrusion artifacts from a forensic perspective."] },
      { id: "scope", label: "Scope", heading: "Scope", body: ["Infrastructure vulnerability assessment", "Intrusion artifact analysis", "Risk reporting"] },
    ],
  },
  {
    slug: "forensic-analysis",
    kicker: "EXPERT SERVICE",
    name: "Digital forensic analysis",
    summary: "Legally valid evidence analysis and court-ready expert reports.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["We analyze legally valid evidence in cases of embezzlement, tech leakage, or HR incidents."] },
      { id: "deliverable", label: "Deliverables", heading: "Deliverables", body: ["Court-ready expert reports", "Evidence preservation & analysis records"] },
    ],
  },
  {
    slug: "education",
    kicker: "EXPERT SERVICE",
    name: "Forensic & security training",
    summary: "Investigation-grade practical skills transfer and customized staff training.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["We transfer investigation-grade cutting-edge forensic practical skills."] },
      { id: "curriculum", label: "Curriculum", heading: "Curriculum", body: ["Practical forensics track", "Customized security-awareness training"] },
    ],
  },
  {
    slug: "secure-erasure",
    kicker: "EXPERT SERVICE",
    name: "Secure erasure",
    summary: "Expert permanent-deletion service and official deletion certificate issuance.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["Our experts perform permanent deletion on asset return or disposal."] },
      { id: "certificate", label: "Certificate", heading: "Certificate", body: ["Official permanent-deletion certificate", "Eliminated legal risk"] },
    ],
  },
];

/** Unified product detail. Win/Mac/Linux exist only as tab content on this
 * page (no separate routes); each tab's data is separated so it can be managed
 * individually once a CMS is connected. */
export const productsEn: Record<string, DetailPage> = {
  "dfas/pro-one": {
    slug: "pro-one",
    kicker: "DFAS · PRO ONE",
    name: "DFAS Pro One",
    summary:
      "A single unified on-device AI digital forensics product supporting Windows, macOS and Linux.",
    tabs: [
      {
        id: "win",
        label: "Windows",
        heading: "Windows support",
        body: [
          "Automatically collects and analyzes Windows artifacts such as the registry, event logs and prefetch.",
          "Supports live acquisition even under disk encryption such as BitLocker.",
          "Provides offline on-device AI triage for air-gapped field environments.",
        ],
      },
      {
        id: "mac",
        label: "macOS",
        heading: "macOS support",
        body: [
          "Collects macOS artifacts based on APFS snapshots and the Unified Log.",
          "Provides acquisition procedures that account for FileVault and T2/Apple Silicon security.",
          "Keeps case context consistent with the same analysis workflow as Windows.",
        ],
      },
      {
        id: "linux",
        label: "Linux",
        heading: "Linux support",
        body: [
          "Analyzes major file systems such as ext4/XFS and systemd/journald logs.",
          "Rapidly secures volatile data in server and container environments.",
          "Supports bulk collection across large node fleets through CLI automation.",
        ],
      },
    ],
    links: [{ label: "DFAS series overview", href: "/en/solutions/dfas" }],
  },
};
