/** Content model for the UROCK marketing site.
 * These types are the stable contract between pages/components and the content
 * source. Swapping the local source for a headless CMS adapter must keep these
 * shapes intact so no component needs to change. */

export type Locale = "ko" | "en";

/** Inline text with optional accent highlighting (used for headings). */
export interface TextSegment {
  text: string;
  accent?: boolean;
}

export interface CtaLink {
  label: string;
  /** In-page anchor target id (without '#') for smooth scroll. */
  targetId?: string;
  /** Or an internal route (locale-relative path). */
  href?: string;
}

export interface HeroReadoutRow {
  label: string;
  value: string;
  tone: "blue" | "teal" | "bright";
}

export interface HeroContent {
  badge: string;
  title: TextSegment[];
  lead: string;
  monoNote: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  readout: {
    header: string;
    status: string;
    rows: HeroReadoutRow[];
    legendLow: string;
    legendHigh: string;
  };
  scope: { index: string; label: string; href: string }[];
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  highlight?: boolean;
}

export interface ProcessContent {
  kicker: string;
  title: string;
  desc: string;
  steps: ProcessStep[];
}

export interface IconItem {
  icon: string;
  title: string;
  desc: string;
  href: string;
  iconColor?: string;
  tag?: string;
  highlight?: boolean;
}

export interface ScenariosContent {
  kicker: string;
  title: TextSegment[];
  desc: string;
  items: IconItem[];
}

export interface PersonasContent {
  kicker: string;
  title: TextSegment[];
  items: IconItem[];
}

export interface SolutionSlide {
  id: string;
  kicker: string;
  series: string;
  title: string;
  desc: string;
  points: string[];
  cta: CtaLink;
}

export interface SolutionsCarouselContent {
  kicker: string;
  title: TextSegment[];
  desc: string;
  slides: SolutionSlide[];
}

export interface Region {
  code: string;
  key: string;
  name: string;
  role: string;
  desc: string;
  /** Relative position on the schematic map, 0..100 percent. */
  x: number;
  y: number;
}

export interface GlobalContent {
  kicker: string;
  title: TextSegment[];
  desc: string;
  regions: Region[];
}

export interface NewsItem {
  id: string;
  category: string;
  categoryLabel: string;
  tag: string;
  date: string;
  title: string;
  href: string;
}

export interface NewsContent {
  kicker: string;
  title: TextSegment[];
  filters: { id: string; label: string }[];
  items: NewsItem[];
}

export interface ServicesSectionContent {
  kicker: string;
  title: TextSegment[];
  items: { icon: string; title: string; desc: string }[];
}

export interface TrustItem {
  label: string;
  name: string;
  desc: string;
  color: string;
}

export interface TrustContent {
  kicker: string;
  title: TextSegment[];
  items: TrustItem[];
}

export interface PartnersContent {
  kicker: string;
  items: string[];
}

export interface ContactCtaContent {
  kicker: string;
  title: TextSegment[];
  desc: string;
  cta: CtaLink;
}

export interface HomeContent {
  hero: HeroContent;
  process: ProcessContent;
  scenarios: ScenariosContent;
  personas: PersonasContent;
  solutions: SolutionsCarouselContent;
  servicesSection: ServicesSectionContent;
  trust: TrustContent;
  global: GlobalContent;
  partners: PartnersContent;
  news: NewsContent;
  contactCta: ContactCtaContent;
}

export interface DetailTab {
  id: string;
  label: string;
  heading: string;
  body: string[];
}

export interface DetailPage {
  slug: string;
  kicker: string;
  name: string;
  summary: string;
  tabs: DetailTab[];
  /** Optional related links (e.g. category -> product detail). */
  links?: { label: string; href: string }[];
}
