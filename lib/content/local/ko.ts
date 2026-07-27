import type { DetailPage, HomeContent } from "../schema";

export const homeKo: HomeContent = {
  hero: {
    badge: "AI DIGITAL FORENSICS · ON-SITE RISK INTELLIGENCE",
    title: [
      { text: "흩어진 디지털 흔적을 " },
      { text: "연결", accent: true },
      { text: "해\n데이터의 " },
      { text: "숨은 가치", accent: true },
      { text: "를 발견합니다." },
    ],
    lead: "유락은 현장 디지털 포렌식과 원격 PC 점검, 스마트기기 촬영·미디어 흔적 분석, 데이터 삭제 결과 관리와 전문 서비스를 제공하는 AI 디지털 포렌식 전문기업입니다.",
    monoNote:
      "// 외부 연결이 제한된 현장까지 고려한 폐쇄망·온디바이스 AI 포렌식 기술을 개발합니다.",
    primaryCta: { label: "솔루션 살펴보기 →", targetId: "cC-solutions" },
    secondaryCta: { label: "도입·데모 상담", targetId: "cC-contact" },
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
      { index: "01 · DIGITAL FORENSICS", label: "PC·시스템 기록 분석", href: "#cC-solutions" },
      { index: "02 · MEDIA INSPECTION", label: "스마트기기 촬영·미디어 흔적 점검", href: "#cC-solutions" },
      { index: "03 · DATA ERASURE", label: "스마트기기 삭제 수행 및 결과 관리", href: "#cC-solutions" },
    ],
  },
  process: {
    kicker: "// PROCESS_PIPELINE",
    title: "단서 → 관계 → 연결 → 진실",
    desc: "모든 데이터는 중력을 가진 하나의 사실로 수렴합니다. False-Color로 데이터 밀도와 관계망을 시각화합니다.",
    steps: [
      { step: "STEP_01", title: "발견", desc: "경계에서 놓치기 쉬운 단서를 찾습니다." },
      { step: "STEP_02", title: "정리", desc: "파편화된 기록을 구조로 정돈합니다." },
      { step: "STEP_03", title: "연결", desc: "시간·행위·데이터의 관계를 잇습니다." },
      { step: "STEP_04", title: "증명", desc: "판단 가능한 사실과 가치로 완성합니다.", highlight: true },
    ],
  },
  solutionFinder: {
    kicker: "// FIELD_SCENARIOS · 02",
    title: [{ text: "조직에 꼭 맞는\n솔루션을 찾아보세요." }],
    desc: "해결하고 싶은 문제 또는 담당 업무를 선택하면, 가장 적합한 유락 솔루션과 서비스를 추천해 드립니다.",
    tabs: [
      {
        id: "problem",
        label: "문제 기반",
        items: [
          { icon: "person_off", title: "데이터 유출 조사", desc: "퇴사자·재직자의 파일 반출 흔적을 확인합니다.", href: "/ko/solutions/dfas" },
          { icon: "devices", title: "다중 PC 점검", desc: "본사·지사·원격 근무지 PC의 보안 상태를 점검합니다.", href: "/ko/solutions/dfas/go" },
          { icon: "wifi_off", title: "폐쇄망 환경 분석", desc: "외부 연결이 제한된 환경에서 데이터를 분석합니다.", href: "/ko/solutions/dfas/pro-one" },
          { icon: "photo_camera", title: "매체 반입 점검", desc: "보안구역 출입 전 스마트폰 촬영·미디어 활동을 점검합니다.", href: "/ko/solutions/gatemanager" },
          { icon: "smartphone", title: "모바일 기기 데이터 삭제", desc: "업무용 스마트폰·태블릿을 안전하게 삭제하고 결과를 기록합니다.", href: "/ko/solutions/m-secumanager" },
          { icon: "plagiarism", title: "디지털 증거 분석", desc: "사고와 관련된 기기·디지털 증거의 전문 분석을 의뢰합니다.", href: "/ko/services/forensic-analysis" },
        ],
      },
      {
        id: "role",
        label: "담당 업무별",
        items: [
          { icon: "gavel", iconColor: "var(--brand-blue)", title: "내부 감사·준법 담당", desc: "내부 조사와 데이터 유출 검토를 담당하는 팀을 위한 솔루션입니다.", href: "/ko/solutions/dfas/discovery" },
          { icon: "manage_search", iconColor: "var(--brand-blue)", title: "정보보안 담당", desc: "엔드포인트 보안과 사용자 행위 리스크를 모니터링하는 팀을 위한 솔루션입니다.", href: "/ko/solutions/dfas/go" },
          { icon: "account_balance", iconColor: "var(--brand-blue)", title: "수사기관·공공 담당", desc: "포렌식 수집·분석과 현장 조사를 수행하는 기관을 위한 솔루션입니다.", href: "/ko/solutions/dfas/pro-one" },
          { icon: "science", iconColor: "#B7A5FF", title: "연구개발·제조 보안 담당", desc: "폐쇄망 환경과 제한구역을 관리하는 팀을 위한 솔루션입니다.", href: "/ko/solutions/gatemanager" },
          { icon: "inventory_2", iconColor: "var(--brand-accent)", title: "총무·IT 자산관리 담당", desc: "업무용 모바일 기기의 반납·재배포·관리를 담당하는 팀을 위한 솔루션입니다.", href: "/ko/solutions/m-secumanager" },
          { icon: "support_agent", iconColor: "var(--brand-accent)", title: "법무·전문 서비스 담당", desc: "법률 전문가와 디지털 증거 분석이 필요한 조직을 위한 솔루션입니다.", href: "/ko/services/forensic-analysis" },
        ],
      },
    ],
  },
  solutions: {
    kicker: "// SOLUTION_PORTFOLIO · 04",
    title: [{ text: "서로 다른 제품군,\n하나의 진실로 이어지는 구조." }],
    desc: "기록을 분석하고, 유출을 차단하고, 삭제를 증명합니다. 오른쪽 목록에서 제품군을 선택하세요.",
    slides: [
      {
        id: "dfas",
        kicker: "RECORD · DIGITAL FORENSICS",
        series: "DFAS Series",
        title: "인터넷이 끊긴 현장에서도 작동하는 온디바이스 AI 포렌식",
        desc: "디지털 기록을 발견·정리해 사건과 행위의 맥락을 확인합니다. 폐쇄망 환경까지 고려한 AI 디지털 포렌식 제품군입니다.",
        points: [
          "DFAS Pro One · 폐쇄망 환경에서도 작동하는 전 OS 통합 포렌식",
          "DFAS Edge · 현장 단속·긴급 감사용 초고속 수집·인덱싱 하드웨어",
          "DFAS Go · 자연어 검색으로 사내 리스크 징후를 선별 수집",
          "DFAS Discovery · 감사 증거 자동 분류·제출용 보고서 완성",
          "DFAS Arc · 문서 보안등급 분류·기밀 탐지 AI 아카이빙",
        ],
        cta: { label: "도입·데모 상담 →", targetId: "cC-contact" },
      },
      {
        id: "gatemanager",
        kicker: "CONNECT · MEDIA INSPECTION",
        series: "GateManager Series",
        title: "보안 스티커 없는 완벽한 출입 통제, 기밀 유출 원천 차단",
        desc: "기기·시간·촬영 가능 행위의 관계를 확인 가능한 흐름으로 연결합니다. 주요 시설·연구소·보안구역의 불법 촬영과 기술 유출을 통제합니다.",
        points: [
          "GateManager · 보안 스티커 없이 카메라 촬영을 통제하는 지능형 통제",
          "GateManager Pro · 다수 단말 실시간 모니터링·추적 포렌식 로그 중앙 관제",
        ],
        cta: { label: "도입·데모 상담 →", targetId: "cC-contact" },
      },
      {
        id: "m-secumanager",
        kicker: "VERIFY · DATA ERASURE",
        series: "M-SecuManager Series",
        title: "단 1비트의 흔적도 남기지 않는 완전 무결한 삭제",
        desc: "삭제 결과를 확인·기록해 데이터 처리의 신뢰를 완성합니다. 국가정보원(NIS)·글로벌 표준(DoD 5220.22-M) 안심삭제 규격을 준수합니다.",
        points: [
          "M-SecuManager P · 현장 방문 삭제 최적화 포터블 패키지",
          "M-SecuManager S · 다수 모바일 기기 원격 동시 삭제·중앙 모니터링",
          "M-SecuManager G · 자율 반납·영구 삭제 증적 발행 독립형 키오스크",
        ],
        cta: { label: "도입·데모 상담 →", targetId: "cC-contact" },
      },
      {
        id: "services",
        kicker: "SERVICE · EXPERT OPERATIONS",
        series: "전문 서비스",
        title: "유락 10년 노하우 기반의 행위 중심 전문 서비스",
        desc: "제품 도입이 아니어도 전문가가 직접 수행하는 진단·분석·교육·삭제 서비스로 조직의 보안 역량을 보완합니다.",
        points: [
          "보안진단 서비스 · 침입 흔적(Artifacts)까지 정밀 진단",
          "디지털 포렌식 분석 · 법적 효력을 갖는 증거 분석·감정 보고서",
          "포렌식·정보보안 교육 · 수사기관 수준 실무 기술 전수",
          "안심삭제 서비스 · 전문가 영구 삭제 대행·인증서 발행",
        ],
        cta: { label: "서비스 자세히 →", targetId: "cC-services" },
      },
    ],
  },
  servicesSection: {
    kicker: "// EXPERT_SERVICES · 05",
    title: [{ text: "제품을 넘어,\n사람이 직접 수행하는 신뢰." }],
    items: [
      { icon: "policy", title: "보안진단 서비스", desc: "인프라 취약점 점검을 넘어 시스템 내 공격자의 침입 흔적(Artifacts)까지 포렌식 관점에서 정밀 진단." },
      { icon: "plagiarism", title: "디지털 포렌식 분석", desc: "횡령·기술 유출·인사 사고 발생 시 법적 효력을 갖는 증거 분석 및 법정 제출용 전문 감정 보고서." },
      { icon: "school", title: "포렌식·정보보안 교육", desc: "수사기관 수준의 최첨단 포렌식 실무 기술 전수 및 임직원 맞춤형 보안 의식 강화 커리큘럼." },
      { icon: "delete_forever", title: "안심삭제 서비스", desc: "자산 반납·불용 처분 시 전문가 영구 삭제 대행 및 공식 영구 삭제 인증서 발행으로 법적 리스크 소멸." },
    ],
  },
  trust: {
    kicker: "// TECHNOLOGY_TRUST · 06",
    title: [{ text: "검증된 기술과 표준 위에." }],
    items: [
      { label: "CERTIFICATION", name: "인증", desc: "정보보호·품질 인증 체계 기반의 신뢰.", color: "var(--brand-accent)" },
      { label: "PATENT", name: "특허", desc: "포렌식·데이터 처리 기술 특허 보유·출원.", color: "var(--brand-blue)" },
      { label: "STANDARD", name: "삭제 표준", desc: "NIS·DoD 5220.22-M 안심삭제 규격 준수.", color: "#B7A5FF" },
      { label: "AWARDS", name: "수상", desc: "기술력·제품 완성도를 여러 분야에서 인정.", color: "var(--brand-accent-bright)" },
    ],
  },
  global: {
    kicker: "// GLOBAL_DEPLOYMENT · 07",
    title: [{ text: "데이터 우주는\n국경을 넘어 확장됩니다." }],
    desc: "노드를 선택하면 유락의 사업 거점 정보를 확인할 수 있습니다.",
    regions: [
      { code: "KR", key: "kr", name: "대한민국", role: "HEADQUARTERS · R&D", desc: "본사이자 연구개발 거점. AI 디지털 포렌식 제품 개발과 국내 포렌식·보안 서비스를 총괄합니다.", x: 80.3, y: 42.7 },
      { code: "SA", key: "sa", name: "사우디아라비아", role: "GLOBAL PARTNER REGION", desc: "중동 지역 사업 협력 거점. 현지 환경에 맞춘 디지털 포렌식·보안 솔루션 공급을 추진합니다.", x: 25, y: 54.2 },
      { code: "OM", key: "om", name: "오만", role: "GLOBAL PARTNER REGION", desc: "중동 지역 사업 협력 거점. 공공·기업 보안 수요에 대응하는 솔루션 협력을 전개합니다.", x: 32.9, y: 50 },
      { code: "IN", key: "in", name: "인도", role: "GLOBAL PARTNER REGION", desc: "남아시아 사업 협력 거점. 대규모 조직의 데이터 보안·포렌식 수요에 대응합니다.", x: 52.6, y: 62.5 },
      { code: "TW", key: "tw", name: "대만", role: "GLOBAL PARTNER REGION", desc: "동아시아 사업 협력 거점. 제조·연구 환경의 정보보안 솔루션 협력을 추진합니다.", x: 77.4, y: 55.8 },
    ],
  },
  partners: {
    kicker: "// PARTNERS · CUSTOMERS · 08",
    items: ["수사기관", "공공기관", "금융", "제조·연구", "대기업", "법무"],
  },
  news: {
    kicker: "// UROCK_NEWS · 09",
    title: [{ text: "UROCK NEWS" }],
    filters: [
      { id: "all", label: "All" },
      { id: "news", label: "유락소식" },
      { id: "product", label: "제품소식" },
      { id: "expo", label: "전시회" },
    ],
    items: [
      { id: "n1", category: "news", categoryLabel: "유락소식", tag: "보도자료", date: "2025.03.14", title: "DFAS Edge 온디바이스 AI 포렌식 기술 개발 소식", href: "#" },
      { id: "n2", category: "product", categoryLabel: "제품소식", tag: "제품 업데이트", date: "2025.02.27", title: "DFAS Discovery 자동 보고서 생성 기능 업데이트", href: "#" },
      { id: "n3", category: "expo", categoryLabel: "전시회", tag: "전시·행사", date: "2025.02.05", title: "국내외 정보보안 전시회 참가 안내", href: "#" },
      { id: "n4", category: "news", categoryLabel: "유락소식", tag: "보도자료", date: "2025.01.18", title: "유락, 국가기관 대상 온디바이스 포렌식 공급 계약 체결", href: "#" },
      { id: "n5", category: "product", categoryLabel: "제품소식", tag: "제품 업데이트", date: "2024.12.30", title: "GateManager 모바일 완전삭제 알고리즘 신규 지원 기종 추가", href: "#" },
      { id: "n6", category: "expo", categoryLabel: "전시회", tag: "전시·행사", date: "2024.11.22", title: "디지털포렌식 컨퍼런스 2024 부스 운영 후기", href: "#" },
    ],
  },
  contactCta: {
    kicker: "RECORD · CONNECT · VERIFY · 10",
    title: [{ text: "흩어진 흔적을,\n판단 가능한 결과로." }],
    desc: "조직 환경에 맞춘 1:1 보안진단부터 제품 도입·데모, 견적·소개서까지 유락 전문가가 함께 설계합니다.",
    cta: { label: "도입·데모 상담", href: "contact" },
  },
};

export const solutionsKo: DetailPage[] = [
  {
    slug: "dfas",
    kicker: "RECORD · DIGITAL FORENSICS",
    name: "DFAS Series",
    summary: "인터넷이 끊긴 현장에서도 작동하는 온디바이스 AI 디지털 포렌식 제품군.",
    tabs: [
      { id: "overview", label: "개요", heading: "제품 개요", body: ["디지털 기록을 발견·정리해 사건과 행위의 맥락을 확인합니다.", "폐쇄망 환경까지 고려한 AI 디지털 포렌식 제품군입니다."] },
      { id: "features", label: "주요 기능", heading: "주요 기능", body: ["DFAS Pro One · 전 OS 통합 포렌식", "DFAS Edge · 초고속 수집·인덱싱 하드웨어", "DFAS Go · 자연어 검색 기반 선별 수집", "DFAS Discovery · e-Discovery 자동 분류·보고서", "DFAS Arc · 기밀 탐지 AI 아카이빙"] },
      { id: "benefits", label: "도입 효과", heading: "도입 효과", body: ["폐쇄망·현장 환경에서도 신속한 증거 수집.", "비전문가도 활용 가능한 자연어 분석.", "제출용 보고서 자동 완성으로 업무 효율화."] },
    ],
    links: [{ label: "DFAS Pro One 상세 보기", href: "/ko/solutions/dfas/pro-one" }],
  },
  {
    slug: "gatemanager",
    kicker: "CONNECT · MEDIA INSPECTION",
    name: "GateManager Series",
    summary: "보안 스티커 없는 완벽한 출입 통제로 기밀 유출을 원천 차단합니다.",
    tabs: [
      { id: "overview", label: "개요", heading: "제품 개요", body: ["기기·시간·촬영 가능 행위의 관계를 확인 가능한 흐름으로 연결합니다.", "주요 시설·연구소·보안구역의 불법 촬영과 기술 유출을 통제합니다."] },
      { id: "features", label: "주요 기능", heading: "주요 기능", body: ["GateManager · 지능형 카메라 촬영 통제", "GateManager Pro · 다수 단말 중앙 관제·추적 포렌식 로그"] },
      { id: "benefits", label: "도입 효과", heading: "도입 효과", body: ["출입구 단계부터 기밀 유출 차단.", "실시간 모니터링으로 리스크 조기 대응."] },
    ],
  },
  {
    slug: "m-secumanager",
    kicker: "VERIFY · DATA ERASURE",
    name: "M-SecuManager Series",
    summary: "단 1비트의 흔적도 남기지 않는 완전 무결한 데이터 삭제.",
    tabs: [
      { id: "overview", label: "개요", heading: "제품 개요", body: ["삭제 결과를 확인·기록해 데이터 처리의 신뢰를 완성합니다.", "국가정보원(NIS)·글로벌 표준(DoD 5220.22-M) 안심삭제 규격을 준수합니다."] },
      { id: "features", label: "주요 기능", heading: "주요 기능", body: ["M-SecuManager P · 현장 방문 삭제 포터블 패키지", "M-SecuManager S · 원격 동시 삭제·중앙 모니터링", "M-SecuManager G · 자율 반납·증적 발행 키오스크"] },
      { id: "benefits", label: "도입 효과", heading: "도입 효과", body: ["영구 삭제 증적으로 법적 리스크 소멸.", "대량 기기의 효율적 삭제 운영."] },
    ],
  },
];

export const servicesKo: DetailPage[] = [
  {
    slug: "security-diagnosis",
    kicker: "EXPERT SERVICE",
    name: "보안진단 서비스",
    summary: "인프라 취약점을 넘어 침입 흔적(Artifacts)까지 포렌식 관점에서 정밀 진단.",
    tabs: [
      { id: "overview", label: "개요", heading: "서비스 개요", body: ["시스템 내 공격자의 침입 흔적까지 포렌식 관점에서 정밀 진단합니다."] },
      { id: "scope", label: "진단 범위", heading: "진단 범위", body: ["인프라 취약점 점검", "침입 흔적(Artifacts) 분석", "리스크 리포트 제공"] },
    ],
  },
  {
    slug: "forensic-analysis",
    kicker: "EXPERT SERVICE",
    name: "디지털 포렌식 분석",
    summary: "법적 효력을 갖는 증거 분석 및 법정 제출용 전문 감정 보고서.",
    tabs: [
      { id: "overview", label: "개요", heading: "서비스 개요", body: ["횡령·기술 유출·인사 사고 발생 시 법적 효력을 갖는 증거를 분석합니다."] },
      { id: "deliverable", label: "산출물", heading: "산출물", body: ["법정 제출용 전문 감정 보고서", "증거 보존·분석 기록"] },
    ],
  },
  {
    slug: "education",
    kicker: "EXPERT SERVICE",
    name: "포렌식·정보보안 교육",
    summary: "수사기관 수준의 실무 기술 전수 및 임직원 맞춤형 보안 교육.",
    tabs: [
      { id: "overview", label: "개요", heading: "서비스 개요", body: ["수사기관 수준의 최첨단 포렌식 실무 기술을 전수합니다."] },
      { id: "curriculum", label: "커리큘럼", heading: "커리큘럼", body: ["실무 포렌식 기술 과정", "임직원 맞춤형 보안 의식 강화"] },
    ],
  },
  {
    slug: "secure-erasure",
    kicker: "M-SECUMANAGER",
    name: "안심 삭제 서비스",
    summary: "전문가 영구 삭제 대행 및 공식 영구 삭제 인증서 발행.",
    tabs: [
      { id: "overview", label: "개요", heading: "서비스 개요", body: ["자산 반납·불용 처분 시 전문가가 영구 삭제를 대행합니다."] },
      { id: "certificate", label: "인증", heading: "인증", body: ["공식 영구 삭제 인증서 발행", "법적 리스크 소멸"] },
    ],
    links: [{ label: "M-SecuManager 시리즈 개요", href: "/ko/solutions/m-secumanager" }],
    // IA 개편: '컨설팅' 그룹에서 제외되고 솔루션 > M-SecuManager 하위 항목으로
    // 이동. URL은 하위 호환을 위해 유지하고, 인덱스 목록에서만 숨김.
    unlisted: true,
  },
];

/** 통합 제품 상세. Win/Mac/Linux는 별도 route가 아니라 이 페이지의 탭 콘텐츠로만
 * 존재하며, 탭별 데이터가 분리되어 있어 CMS 연동 시 개별 관리할 수 있습니다. */
export const productsKo: Record<string, DetailPage> = {
  "dfas/pro-one": {
    slug: "pro-one",
    kicker: "DFAS · PRO ONE",
    name: "DFAS Pro One",
    summary:
      "하나의 제품으로 Windows·macOS·Linux 전 운영체제를 통합 지원하는 온디바이스 AI 디지털 포렌식 통합 제품입니다.",
    tabs: [
      {
        id: "win",
        label: "Windows",
        heading: "Windows 지원",
        body: [
          "레지스트리·이벤트 로그·프리페치 등 Windows 아티팩트를 자동 수집·분석합니다.",
          "BitLocker 등 디스크 암호화 환경에서도 라이브 수집을 지원합니다.",
          "폐쇄망 현장에서 오프라인으로 동작하는 온디바이스 AI 선별을 제공합니다.",
        ],
      },
      {
        id: "mac",
        label: "macOS",
        heading: "macOS 지원",
        body: [
          "APFS 스냅샷과 Unified Log를 기반으로 macOS 아티팩트를 수집합니다.",
          "FileVault 및 T2/Apple Silicon 보안 환경을 고려한 수집 절차를 제공합니다.",
          "Windows와 동일한 분석 워크플로로 사건 맥락을 일관되게 정리합니다.",
        ],
      },
      {
        id: "linux",
        label: "Linux",
        heading: "Linux 지원",
        body: [
          "ext4·XFS 등 주요 파일시스템과 systemd/journald 로그를 분석합니다.",
          "서버·컨테이너 환경의 휘발성 데이터를 신속하게 확보합니다.",
          "CLI 자동화로 대규모 노드에 대한 일괄 수집을 지원합니다.",
        ],
      },
    ],
    links: [{ label: "DFAS 시리즈 개요", href: "/ko/solutions/dfas" }],
  },
  "dfas/edge": {
    slug: "edge",
    kicker: "DFAS · EDGE",
    name: "DFAS Edge",
    summary: "현장 단속·긴급 감사용 초고속 수집·인덱싱 하드웨어입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "현장 단속·긴급 감사 상황에 맞춰 초고속으로 데이터를 수집·인덱싱하는 전용 하드웨어입니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "DFAS 시리즈 개요", href: "/ko/solutions/dfas" }],
  },
  "dfas/go": {
    slug: "go",
    kicker: "DFAS · GO",
    name: "DFAS Go",
    summary: "자연어 검색으로 사내 리스크 징후를 선별 수집하는 제품입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "포렌식 비전문가도 자연어 검색으로 핵심 리스크를 신속하게 선별 수집할 수 있습니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "DFAS 시리즈 개요", href: "/ko/solutions/dfas" }],
  },
  "dfas/discovery": {
    slug: "discovery",
    kicker: "DFAS · DISCOVERY",
    name: "DFAS Discovery",
    summary: "감사 증거 자동 분류·제출용 보고서를 완성하는 제품입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "방대한 비정형 데이터에서 e-Discovery 증거를 자동 분류하고 보고서로 완성합니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "DFAS 시리즈 개요", href: "/ko/solutions/dfas" }],
  },
  "dfas/arc": {
    slug: "arc",
    kicker: "DFAS · ARC",
    name: "DFAS Arc",
    summary: "문서 보안등급 분류·기밀 탐지 AI 아카이빙 제품입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "문서의 보안등급을 자동 분류하고 기밀 유출 소지를 탐지해 아카이빙합니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "DFAS 시리즈 개요", href: "/ko/solutions/dfas" }],
  },
  "m-secumanager/p": {
    slug: "p",
    kicker: "M-SECUMANAGER · P",
    name: "M-SecuManager P",
    summary: "현장 방문 삭제 최적화 포터블 패키지입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "현장을 방문해 스마트기기를 완전 삭제하는 작업에 최적화된 포터블 패키지입니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "M-SecuManager 시리즈 개요", href: "/ko/solutions/m-secumanager" }],
  },
  "m-secumanager/s": {
    slug: "s",
    kicker: "M-SECUMANAGER · S",
    name: "M-SecuManager S",
    summary: "다수 모바일 기기 원격 동시 삭제·중앙 모니터링 제품입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "다수의 모바일 기기를 원격에서 동시에 삭제하고 중앙에서 모니터링합니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "M-SecuManager 시리즈 개요", href: "/ko/solutions/m-secumanager" }],
  },
  "m-secumanager/g": {
    slug: "g",
    kicker: "M-SECUMANAGER · G",
    name: "M-SecuManager G",
    summary: "자율 반납·영구 삭제 증적 발행 독립형 키오스크입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "임직원이 스스로 기기를 반납하면 영구 삭제 후 증적을 발행하는 독립형 키오스크입니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "M-SecuManager 시리즈 개요", href: "/ko/solutions/m-secumanager" }],
  },
  "gatemanager/pro": {
    slug: "pro",
    kicker: "GATEMANAGER · PRO",
    name: "GateManager Pro",
    summary: "다수 단말 실시간 모니터링·추적 포렌식 로그 중앙 관제 제품입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "제품 개요",
        body: [
          "다수 단말을 실시간으로 모니터링하고, 추적 포렌식 로그를 중앙에서 관제합니다.",
          "상세 사양·도입 문의 콘텐츠는 준비 중입니다.",
        ],
      },
    ],
    links: [{ label: "GateManager 시리즈 개요", href: "/ko/solutions/gatemanager" }],
  },
};

/** About UROCK sub-pages. Content reused from existing homepage copy where
 * available (trust/global/news); items without an existing source are
 * marked as placeholders pending real copy. */
export const aboutKo: DetailPage[] = [
  {
    slug: "greeting",
    kicker: "ABOUT UROCK",
    name: "인사말",
    summary: "유락 대표 인사말 콘텐츠는 준비 중입니다.",
    tabs: [{ id: "overview", label: "개요", heading: "인사말", body: ["대표 인사말 콘텐츠는 준비 중입니다."] }],
  },
  {
    slug: "history",
    kicker: "ABOUT UROCK",
    name: "연혁",
    summary: "유락의 주요 연혁 콘텐츠는 준비 중입니다.",
    tabs: [{ id: "overview", label: "개요", heading: "연혁", body: ["회사 연혁 콘텐츠는 준비 중입니다."] }],
  },
  {
    slug: "certifications",
    kicker: "ABOUT UROCK",
    name: "인증·특허·수상",
    summary: "정보보호·품질 인증 체계, 보유 특허 및 수상 현황입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "인증·특허·수상",
        body: [
          "정보보호·품질 인증 체계 기반의 신뢰를 갖추고 있습니다.",
          "포렌식·데이터 처리 기술 특허를 보유·출원 중입니다.",
          "주요 수상 및 세부 인증서·특허 목록은 준비 중입니다.",
        ],
      },
    ],
  },
  {
    slug: "global",
    kicker: "ABOUT UROCK",
    name: "글로벌파트너",
    summary: "유락의 사업 거점 및 글로벌 파트너 네트워크입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "글로벌파트너",
        body: [
          "대한민국 본사를 중심으로 사우디아라비아·오만·인도·대만 등과 협력하고 있습니다.",
          "지역별 상세 소개는 준비 중입니다.",
        ],
      },
    ],
  },
  {
    slug: "brand",
    kicker: "ABOUT UROCK",
    name: "브랜드이야기",
    summary: "유락의 브랜드 스토리와 CI 콘텐츠는 준비 중입니다.",
    tabs: [
      { id: "overview", label: "개요", heading: "브랜드이야기", body: ["브랜드 스토리·CI 콘텐츠는 준비 중입니다."] },
    ],
  },
  {
    slug: "news",
    kicker: "ABOUT UROCK",
    name: "유락소식",
    summary: "유락의 최신 소식·제품 업데이트·전시회 정보입니다.",
    tabs: [
      {
        id: "overview",
        label: "개요",
        heading: "유락소식",
        body: [
          "DFAS Edge 온디바이스 AI 포렌식 기술 개발 소식 등 최신 소식을 안내합니다.",
          "전체 소식 목록 페이지는 준비 중입니다.",
        ],
      },
    ],
  },
  {
    slug: "location",
    kicker: "ABOUT UROCK",
    name: "오시는길",
    summary: "유락 본사 오시는 길 안내 콘텐츠는 준비 중입니다.",
    tabs: [
      { id: "overview", label: "개요", heading: "오시는길", body: ["오시는 길 안내(주소·지도) 콘텐츠는 준비 중입니다."] },
    ],
  },
];

export const supportKo: DetailPage[] = [
  {
    slug: "faq",
    kicker: "SUPPORT",
    name: "FAQ",
    summary: "자주 찾는 질문 콘텐츠는 준비 중입니다.",
    tabs: [{ id: "overview", label: "개요", heading: "자주 찾는 질문", body: ["FAQ 콘텐츠는 준비 중입니다."] }],
  },
  {
    slug: "environment",
    kicker: "SUPPORT",
    name: "지원환경(OS) 및 사양",
    summary: "제품별 지원 운영체제·사양 콘텐츠는 준비 중입니다.",
    tabs: [
      { id: "overview", label: "개요", heading: "지원환경 및 사양", body: ["지원 운영체제·사양 콘텐츠는 준비 중입니다."] },
    ],
  },
];
