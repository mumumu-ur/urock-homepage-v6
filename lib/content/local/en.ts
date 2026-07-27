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
  solutionFinder: {
    kicker: "// FIELD_SCENARIOS · 02",
    title: [{ text: "Find the Right Solution\nfor Your Organization" }],
    desc: "Select the problem you need to solve or your area of responsibility, and we'll recommend the most suitable UROCK solution or service.",
    tabs: [
      {
        id: "problem",
        label: "Problem-Based",
        items: [
          { icon: "person_off", title: "Data Leakage Investigation", desc: "Identify traces of file transfers by employees or departing staff.", href: "/en/solutions/dfas" },
          { icon: "devices", title: "Multiple PC Inspection", desc: "Check the security status of headquarters, branch offices, and remote endpoints.", href: "/en/solutions/dfas/go" },
          { icon: "wifi_off", title: "Air-Gapped Environment Analysis", desc: "Analyze data in environments with restricted external connectivity.", href: "/en/solutions/dfas/pro-one" },
          { icon: "photo_camera", title: "Media Inspection", desc: "Check smartphone photo and media activity before entering secure areas.", href: "/en/solutions/gatemanager" },
          { icon: "smartphone", title: "Mobile Device Data Erasure", desc: "Securely erase corporate smartphones and tablets while recording the results.", href: "/en/solutions/m-secumanager" },
          { icon: "plagiarism", title: "Digital Evidence Analysis", desc: "Request professional analysis of devices and digital evidence related to an incident.", href: "/en/services/forensic-analysis" },
        ],
      },
      {
        id: "role",
        label: "By Responsibility",
        items: [
          { icon: "gavel", iconColor: "var(--brand-blue)", title: "Internal Audit & Compliance", desc: "For teams responsible for internal investigations and data leakage reviews.", href: "/en/solutions/dfas/discovery" },
          { icon: "manage_search", iconColor: "var(--brand-blue)", title: "Information Security", desc: "For teams monitoring endpoint security and user activity risks.", href: "/en/solutions/dfas/go" },
          { icon: "account_balance", iconColor: "var(--brand-blue)", title: "Investigation & Public Sector", desc: "For organizations performing forensic collection, analysis, and field investigations.", href: "/en/solutions/dfas/pro-one" },
          { icon: "science", iconColor: "#B7A5FF", title: "R&D & Manufacturing Security", desc: "For teams managing air-gapped environments and restricted production areas.", href: "/en/solutions/gatemanager" },
          { icon: "inventory_2", iconColor: "var(--brand-accent)", title: "General Affairs & IT Asset Management", desc: "For teams responsible for returning, redistributing, and managing corporate mobile devices.", href: "/en/solutions/m-secumanager" },
          { icon: "support_agent", iconColor: "var(--brand-accent)", title: "Legal & Professional Services", desc: "For legal professionals and organizations requiring digital evidence analysis.", href: "/en/services/forensic-analysis" },
        ],
      },
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
    kicker: "M-SECUMANAGER",
    name: "Secure Erasure Service",
    summary: "Expert permanent-deletion service and official deletion certificate issuance.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Overview", body: ["Our experts perform permanent deletion on asset return or disposal."] },
      { id: "certificate", label: "Certificate", heading: "Certificate", body: ["Official permanent-deletion certificate", "Eliminated legal risk"] },
    ],
    links: [{ label: "M-SecuManager series overview", href: "/en/solutions/m-secumanager" }],
    // IA update: removed from the "Consulting" group and relocated as a
    // nav entry under Solutions > M-SecuManager. URL kept for compatibility;
    // only hidden from the index listing.
    unlisted: true,
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
  "dfas/edge": {
    slug: "edge",
    kicker: "DFAS · EDGE",
    name: "DFAS Edge",
    summary: "High-speed collection & indexing hardware for field audits and emergency response.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "Dedicated hardware for ultra-fast collection and indexing in field enforcement and emergency-audit situations.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "DFAS series overview", href: "/en/solutions/dfas" }],
  },
  "dfas/go": {
    slug: "go",
    kicker: "DFAS · GO",
    name: "DFAS Go",
    summary: "Triage internal risk signals with natural-language search.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "Even non-experts can quickly triage key risks with natural-language search.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "DFAS series overview", href: "/en/solutions/dfas" }],
  },
  "dfas/discovery": {
    slug: "discovery",
    kicker: "DFAS · DISCOVERY",
    name: "DFAS Discovery",
    summary: "Automatic evidence classification and submission-ready report generation.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "Automatically classifies e-Discovery evidence from vast unstructured data into finished reports.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "DFAS series overview", href: "/en/solutions/dfas" }],
  },
  "dfas/arc": {
    slug: "arc",
    kicker: "DFAS · ARC",
    name: "DFAS Arc",
    summary: "AI archiving with document classification and confidentiality detection.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "Automatically classifies document security levels and detects confidentiality risk before archiving.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "DFAS series overview", href: "/en/solutions/dfas" }],
  },
  "m-secumanager/p": {
    slug: "p",
    kicker: "M-SECUMANAGER · P",
    name: "M-SecuManager P",
    summary: "Portable package optimized for on-site erasure.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "A portable package optimized for permanently erasing smart devices during on-site visits.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "M-SecuManager series overview", href: "/en/solutions/m-secumanager" }],
  },
  "m-secumanager/s": {
    slug: "s",
    kicker: "M-SECUMANAGER · S",
    name: "M-SecuManager S",
    summary: "Remote simultaneous erasure and central monitoring for many mobile devices.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "Erases many mobile devices remotely and simultaneously with central monitoring.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "M-SecuManager series overview", href: "/en/solutions/m-secumanager" }],
  },
  "m-secumanager/g": {
    slug: "g",
    kicker: "M-SECUMANAGER · G",
    name: "M-SecuManager G",
    summary: "Standalone kiosk for self return and permanent-deletion evidence issuance.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "A standalone kiosk where employees can self-return devices for permanent deletion with issued evidence.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "M-SecuManager series overview", href: "/en/solutions/m-secumanager" }],
  },
  "gatemanager/pro": {
    slug: "pro",
    kicker: "GATEMANAGER · PRO",
    name: "GateManager Pro",
    summary: "Central monitoring and forensic logging across many endpoints in real time.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Product overview",
        body: [
          "Monitors many endpoints in real time and centrally manages forensic tracking logs.",
          "Detailed specifications and inquiry content are coming soon.",
        ],
      },
    ],
    links: [{ label: "GateManager series overview", href: "/en/solutions/gatemanager" }],
  },
};

/** About UROCK sub-pages. Content reused from existing homepage copy where
 * available (trust/global/news); items without an existing source are
 * marked as placeholders pending real copy. */
export const aboutEn: DetailPage[] = [
  {
    slug: "greeting",
    kicker: "ABOUT UROCK",
    name: "Greeting",
    summary: "A greeting message from UROCK's leadership is coming soon.",
    tabs: [{ id: "overview", label: "Overview", heading: "Greeting", body: ["Leadership greeting content is coming soon."] }],
  },
  {
    slug: "history",
    kicker: "ABOUT UROCK",
    name: "History",
    summary: "UROCK's company history and milestones are coming soon.",
    tabs: [{ id: "overview", label: "Overview", heading: "History", body: ["Company history content is coming soon."] }],
  },
  {
    slug: "certifications",
    kicker: "ABOUT UROCK",
    name: "Certifications, Patents & Awards",
    summary: "Information-security and quality certifications, patents held, and awards received.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Certifications, Patents & Awards",
        body: [
          "Trust grounded in information-security and quality certification systems.",
          "Patents held and filed for forensics and data-processing technology.",
          "A detailed list of certificates, patents and awards is coming soon.",
        ],
      },
    ],
  },
  {
    slug: "global",
    kicker: "ABOUT UROCK",
    name: "Global Partners",
    summary: "UROCK's business hubs and global partner network.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "Global Partners",
        body: [
          "Headquartered in South Korea, partnering across Saudi Arabia, Oman, India and Taiwan.",
          "Detailed region-by-region content is coming soon.",
        ],
      },
    ],
  },
  {
    slug: "brand",
    kicker: "ABOUT UROCK",
    name: "Brand Story",
    summary: "UROCK's brand story and CI content is coming soon.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Brand Story", body: ["Brand story and CI content is coming soon."] },
    ],
  },
  {
    slug: "news",
    kicker: "ABOUT UROCK",
    name: "News",
    summary: "The latest UROCK news, product updates, and exhibitions.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        heading: "News",
        body: [
          "Includes the latest updates such as the DFAS Edge on-device AI forensics development.",
          "A full news listing page is coming soon.",
        ],
      },
    ],
  },
  {
    slug: "location",
    kicker: "ABOUT UROCK",
    name: "Location",
    summary: "Directions to the UROCK headquarters are coming soon.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Location", body: ["Directions (address & map) content is coming soon."] },
    ],
  },
];

export const supportEn: DetailPage[] = [
  {
    slug: "faq",
    kicker: "SUPPORT",
    name: "FAQ",
    summary: "Frequently asked questions content is coming soon.",
    tabs: [{ id: "overview", label: "Overview", heading: "FAQ", body: ["FAQ content is coming soon."] }],
  },
  {
    slug: "environment",
    kicker: "SUPPORT",
    name: "Supported Environments",
    summary: "Supported operating systems and specifications per product are coming soon.",
    tabs: [
      { id: "overview", label: "Overview", heading: "Supported Environments", body: ["Supported OS and specification content is coming soon."] },
    ],
  },
];
