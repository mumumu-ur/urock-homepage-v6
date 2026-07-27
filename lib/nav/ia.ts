import type { Locale } from "@/lib/content/schema";

/** Global navigation IA (Header GNB/SNB/mega-menu source of truth).
 * Confirmed structure — do not reorder or omit items without explicit instruction.
 * Solutions content (badge/description/hashtags/icon) ports the Figma GNB/SNB
 * design (node 12002:2805) verbatim; Services/Support/About don't have a
 * Figma SNB yet, so they stay as plain link lists styled to match.
 * Paths are locale-relative (no /ko or /en prefix); render through the
 * next-intl `Link` from `@/i18n/navigation`, which injects the active locale.
 *
 * IA revision (updated): top-level order/grouping now mirrors the confirmed
 * IA doc — 솔루션 → 컨설팅(was 서비스) → 고객지원 → 회사소개, with 안심 삭제
 * 서비스 relocated from 컨설팅 into 솔루션 > M-SecuManager (see `extraLinks`
 * below), and 회사소개's "인사말·연혁" split into separate 인사말/연혁 entries.
 * The IA doc lists the header CTAs as 문의하기 → 데모신청 → 소개서 다운로드,
 * which reads as a priority ranking, not a mandated left-to-right pixel
 * order; `cta` below intentionally keeps its existing render order (text
 * link → outline → filled-primary, ending on the strongest CTA) since the
 * doc didn't explicitly ask for that visual pattern to be reversed. */

export type SolutionIconKey =
  | "dfas-pro-one"
  | "dfas-edge"
  | "dfas-go"
  | "dfas-discovery"
  | "dfas-arc"
  | "msecu-p"
  | "msecu-s"
  | "msecu-g"
  | "gatemanager"
  | "gatemanager-pro";

export type ChildOsKey = "windows" | "mac" | "linux";

export interface NavLeaf {
  label: string;
  href: string;
}

export interface SolutionProduct {
  label: string;
  href: string;
  icon: SolutionIconKey;
  /** Small chip next to the title, e.g. "Window / Mac / Linux", "3,5포트", "AI". */
  badge?: string;
  /** One or two lines; array = one <p> per line as in the Figma source. */
  description: string[];
  hashtags?: string[];
  /** DFAS Pro One only: Win/Mac/Linux, rendered as an indented sub-list
   * linking to the product page's tab query param (?tab=win etc.). */
  children?: { label: string; href: string; icon: ChildOsKey }[];
}

export interface SolutionGroup {
  /** Short badge code shown above the group, e.g. "DFAS", "MCQ", "GM". */
  code: string;
  label: string;
  href: string;
  description: string;
  products: SolutionProduct[];
  /** Extra plain links appended below `products` in this group's column
   * (e.g. M-SecuManager's "안심 삭제 서비스", relocated here from the
   * Consulting menu by the IA update). Rendered without an icon/description,
   * unlike SolutionProduct rows. */
  extraLinks?: NavLeaf[];
}

export interface NavGroup {
  label: string;
  href: string;
  items: NavLeaf[];
}

export interface NavTopItem {
  id: string;
  label: string;
  href?: string;
  /** Mega-menu style (Solutions only) — see SolutionGroup. */
  solutionGroups?: SolutionGroup[];
  /** Simple dropdown: flat item list (Services, Support, About). */
  items?: NavLeaf[];
}

export interface NavCta {
  label: string;
  href: string;
}

export interface NavIA {
  top: NavTopItem[];
  cta: NavCta[];
}

const solutionGroupsKo: SolutionGroup[] = [
  {
    code: "DFAS",
    label: "DFAS",
    href: "/solutions/dfas",
    description: "AI 디지털 포렌식 분석 솔루션",
    products: [
      {
        label: "DFAS Pro One",
        href: "/solutions/dfas/pro-one",
        icon: "dfas-pro-one",
        badge: "Window / Mac / Linux",
        description: [
          "인터넷이 끊긴 현장에서도 완벽하게 작동하는",
          "온디바이스 AI 통합 솔루션",
        ],
        hashtags: ["#다중OS지원", "#기밀유출방지", "#수사기관"],
        children: [
          { label: "DFAS Pro Win", href: "/solutions/dfas/pro-one?tab=win", icon: "windows" },
          { label: "DFAS Pro Mac", href: "/solutions/dfas/pro-one?tab=mac", icon: "mac" },
          { label: "DFAS Pro Linux", href: "/solutions/dfas/pro-one?tab=linux", icon: "linux" },
        ],
      },
      {
        label: "DFAS Edge",
        href: "/solutions/dfas/edge",
        icon: "dfas-edge",
        badge: "AI",
        description: [
          "현장 기기 연결 즉시 초고속 데이터 복제 및",
          "자동 검색 최적화(인덱싱) 일체형 하드웨어",
        ],
        hashtags: ["#현장단속", "#긴급감사", "#쓰기방지(Write-Blocker)"],
      },
      {
        label: "DFAS Go",
        href: "/solutions/dfas/go",
        icon: "dfas-go",
        description: [
          "비전문가용 UI 및 자연어 검색을 통한",
          "신속하고 직관적인 리스크 데이터 선별 수집",
        ],
        hashtags: ["#간편보안감사", "#인사팀", "#중소기업"],
      },
      {
        label: "DFAS Discovery",
        href: "/solutions/dfas/discovery",
        icon: "dfas-discovery",
        description: [
          "대용량 비정형 데이터 (이메일·메신저) 속",
          "증거 분류 및 소송 제출용 보고서 자동 생성",
        ],
        hashtags: ["#법적증거확보", "#대기업감사팀", "#법무법인"],
      },
      {
        label: "DFAS Arc",
        href: "/solutions/dfas/arc",
        icon: "dfas-arc",
        description: [
          "사내 비정형 문서 자동 분류 저장 및",
          "기밀·개인정보 실시간 탐지 감시",
        ],
        hashtags: ["#문서자동라벨링", "#정보보안관리자"],
      },
    ],
  },
  {
    code: "MCQ",
    label: "M-SecuManager",
    href: "/solutions/m-secumanager",
    description: "모바일 데이터 완전삭제 솔루션",
    products: [
      {
        label: "M-SecuManager P",
        href: "/solutions/m-secumanager/p",
        icon: "msecu-p",
        badge: "3,5포트",
        description: [
          "소규모 자산 관리 및 현장 방문 삭제에 최적화된",
          "포터블형 영구 삭제",
        ],
        hashtags: ["#완전삭제", "#소규모자산관리", "#국정원보안인증"],
      },
      {
        label: "M-SecuManager S",
        href: "/solutions/m-secumanager/s",
        icon: "msecu-s",
        badge: "21포트",
        description: [
          "전사 자산 관리 시스템 연동을 통한",
          "다수 단말기 원격 동시 삭제 및 제어",
        ],
        hashtags: ["#네트워크완전삭제", "#엔터프라이즈보안", "#중앙집중관제"],
      },
      {
        label: "M-SecuManager G",
        href: "/solutions/m-secumanager/g",
        icon: "msecu-g",
        badge: "키오스크",
        description: ["거치형 키오스크로 임직원 자율 반납 및 영구 삭제 수행"],
        hashtags: ["#상시셀프삭제", "#자산반납키오스크"],
      },
    ],
    // IA 개편: '안심 삭제 서비스'가 컨설팅 메뉴에서 이 그룹으로 이동.
    extraLinks: [{ label: "안심 삭제 서비스", href: "/services/secure-erasure" }],
  },
  {
    code: "GM",
    label: "GateManager",
    href: "/solutions/gatemanager",
    description: "불법 촬영 및 유출 탐지 솔루션",
    products: [
      {
        label: "GateManager",
        href: "/solutions/gatemanager",
        icon: "gatemanager",
        description: [
          "연구소 및 보안 구역 출입 시 모바일 카메라 구동 및 물리적 제어를 통한 촬영 차단",
          "보안 스티커 없이 카메라 촬영을 통제하여 출입구부터 기밀 유출을 원천 차단",
        ],
        hashtags: ["#신속탐지", "#정보유출방지", "#보안스티커대체"],
      },
      {
        label: "GateManager Pro",
        href: "/solutions/gatemanager/pro",
        icon: "gatemanager-pro",
        description: [
          "게이트 연동 단말들의 통제 상태 실시간 모니터링 및 이상 징후 추적 포렌식 로그 연동",
          "다수 단말의 통제 상태 실시간 모니터링 및 추적 포렌식 로그 연동 중앙 관제",
        ],
        hashtags: ["#정밀탐지", "#통제로그추적", "#중앙관제시스템", "#국가주요시설"],
      },
    ],
  },
];

const solutionGroupsEn: SolutionGroup[] = [
  {
    code: "DFAS",
    label: "DFAS",
    href: "/solutions/dfas",
    description: "AI digital forensics solutions",
    products: [
      {
        label: "DFAS Pro One",
        href: "/solutions/dfas/pro-one",
        icon: "dfas-pro-one",
        badge: "Window / Mac / Linux",
        description: [
          "An on-device AI unified solution that works perfectly",
          "even in air-gapped field environments",
        ],
        hashtags: ["#MultiOS", "#ConfidentialityProtection", "#LawEnforcement"],
        children: [
          { label: "DFAS Pro Win", href: "/solutions/dfas/pro-one?tab=win", icon: "windows" },
          { label: "DFAS Pro Mac", href: "/solutions/dfas/pro-one?tab=mac", icon: "mac" },
          { label: "DFAS Pro Linux", href: "/solutions/dfas/pro-one?tab=linux", icon: "linux" },
        ],
      },
      {
        label: "DFAS Edge",
        href: "/solutions/dfas/edge",
        icon: "dfas-edge",
        badge: "AI",
        description: [
          "All-in-one hardware for instant high-speed cloning and",
          "automatic search optimization (indexing) on connection",
        ],
        hashtags: ["#FieldEnforcement", "#EmergencyAudit", "#WriteBlocker"],
      },
      {
        label: "DFAS Go",
        href: "/solutions/dfas/go",
        icon: "dfas-go",
        description: [
          "Fast, intuitive triage collection of risk data via a",
          "non-expert UI and natural-language search",
        ],
        hashtags: ["#EasySecurityAudit", "#HR", "#SMB"],
      },
      {
        label: "DFAS Discovery",
        href: "/solutions/dfas/discovery",
        icon: "dfas-discovery",
        description: [
          "Classifies evidence within large unstructured data (email, messengers)",
          "and auto-generates litigation-ready reports",
        ],
        hashtags: ["#LegalEvidence", "#EnterpriseAudit", "#LawFirm"],
      },
      {
        label: "DFAS Arc",
        href: "/solutions/dfas/arc",
        icon: "dfas-arc",
        description: [
          "Automatically classifies and archives internal unstructured documents",
          "with real-time confidential/PII detection",
        ],
        hashtags: ["#AutoDocumentLabeling", "#SecurityManager"],
      },
    ],
  },
  {
    code: "MCQ",
    label: "M-SecuManager",
    href: "/solutions/m-secumanager",
    description: "Mobile data permanent-erasure solutions",
    products: [
      {
        label: "M-SecuManager P",
        href: "/solutions/m-secumanager/p",
        icon: "msecu-p",
        badge: "3/5 ports",
        description: [
          "Portable permanent erasure optimized for small-scale asset",
          "management and on-site visits",
        ],
        hashtags: ["#PermanentErasure", "#SmallAssetMgmt", "#NISCertified"],
      },
      {
        label: "M-SecuManager S",
        href: "/solutions/m-secumanager/s",
        icon: "msecu-s",
        badge: "21 ports",
        description: [
          "Remote simultaneous erasure and control of many devices",
          "via enterprise asset-management integration",
        ],
        hashtags: ["#NetworkErasure", "#EnterpriseSecurity", "#CentralControl"],
      },
      {
        label: "M-SecuManager G",
        href: "/solutions/m-secumanager/g",
        icon: "msecu-g",
        badge: "Kiosk",
        description: ["A standalone kiosk for employee self-return and permanent erasure"],
        hashtags: ["#SelfServiceErasure", "#ReturnKiosk"],
      },
    ],
    // IA update: "Secure Erasure Service" moved here from the Consulting menu.
    extraLinks: [{ label: "Secure Erasure Service", href: "/services/secure-erasure" }],
  },
  {
    code: "GM",
    label: "GateManager",
    href: "/solutions/gatemanager",
    description: "Illegal capture & leak detection solutions",
    products: [
      {
        label: "GateManager",
        href: "/solutions/gatemanager",
        icon: "gatemanager",
        description: [
          "Blocks capture via mobile camera activation and physical control at lab/secure-area entry",
          "Controls camera capture without security stickers to block leaks from the entrance",
        ],
        hashtags: ["#FastDetection", "#LeakPrevention", "#StickerReplacement"],
      },
      {
        label: "GateManager Pro",
        href: "/solutions/gatemanager/pro",
        icon: "gatemanager-pro",
        description: [
          "Real-time monitoring of gate-linked endpoint control status with anomaly-tracking forensic log integration",
          "Central control of real-time monitoring and forensic tracking logs across many endpoints",
        ],
        hashtags: ["#PrecisionDetection", "#ControlLogTracking", "#CentralControlSystem", "#NationalFacilities"],
      },
    ],
  },
];

const iaKo: NavIA = {
  top: [
    {
      id: "solutions",
      label: "솔루션",
      href: "/solutions",
      solutionGroups: solutionGroupsKo,
    },
    {
      id: "services",
      label: "컨설팅",
      href: "/services",
      items: [
        { label: "보안진단", href: "/services/security-diagnosis" },
        { label: "디지털포렌식 분석", href: "/services/forensic-analysis" },
        { label: "정보보안 교육", href: "/services/education" },
      ],
    },
    {
      id: "support",
      label: "고객지원",
      items: [
        { label: "문의하기", href: "/contact" },
        { label: "FAQ", href: "/support/faq" },
        { label: "지원환경(OS) 및 사양", href: "/support/environment" },
      ],
    },
    {
      id: "about",
      label: "회사소개",
      items: [
        { label: "인사말", href: "/about/greeting" },
        { label: "연혁", href: "/about/history" },
        { label: "인증·특허·수상", href: "/about/certifications" },
        { label: "글로벌파트너", href: "/about/global" },
        { label: "브랜드이야기", href: "/about/brand" },
        { label: "유락소식", href: "/about/news" },
        { label: "오시는길", href: "/about/location" },
      ],
    },
  ],
  cta: [
    { label: "소개서 다운로드", href: "/downloads/urock-brochure.pdf" },
    { label: "데모신청", href: "/contact?type=demo" },
    { label: "문의하기", href: "/contact" },
  ],
};

const iaEn: NavIA = {
  top: [
    {
      id: "solutions",
      label: "Solutions",
      href: "/solutions",
      solutionGroups: solutionGroupsEn,
    },
    {
      id: "services",
      label: "Consulting",
      href: "/services",
      items: [
        { label: "Security Diagnosis", href: "/services/security-diagnosis" },
        { label: "Digital Forensic Analysis", href: "/services/forensic-analysis" },
        { label: "Security Training", href: "/services/education" },
      ],
    },
    {
      id: "support",
      label: "Support",
      items: [
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ", href: "/support/faq" },
        { label: "Supported Environments", href: "/support/environment" },
      ],
    },
    {
      id: "about",
      label: "About UROCK",
      items: [
        { label: "Greeting", href: "/about/greeting" },
        { label: "History", href: "/about/history" },
        { label: "Certifications, Patents & Awards", href: "/about/certifications" },
        { label: "Global Partners", href: "/about/global" },
        { label: "Brand Story", href: "/about/brand" },
        { label: "News", href: "/about/news" },
        { label: "Location", href: "/about/location" },
      ],
    },
  ],
  cta: [
    { label: "Download Brochure", href: "/downloads/urock-brochure.pdf" },
    { label: "Request Demo", href: "/contact?type=demo" },
    { label: "Contact Us", href: "/contact" },
  ],
};

const ia: Record<Locale, NavIA> = { ko: iaKo, en: iaEn };

export function getNavIA(locale: Locale): NavIA {
  return ia[locale] ?? ia.ko;
}
