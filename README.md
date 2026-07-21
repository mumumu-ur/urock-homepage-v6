# UROCK Homepage v2

UROCK 마케팅 사이트를 **Next.js(App Router) + TypeScript + Tailwind v4**로 이전한 프로젝트입니다.
기존 정적 프로토타입(`Concept C - Computational.dc.html`)의 디자인·인터랙션을 유지하면서,
**Claude Design System(UROCK DS)** 을 단일 소스로 사용하고 한/영 다국어·SEO·문의 폼·CMS 대비 콘텐츠 레이어를 갖췄습니다.

## 요구사항

- Node.js 20 이상 (개발 환경 검증: Node 24)
- npm 10 이상

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기(선택)
npm run dev                  # http://localhost:3000 → /ko 로 리다이렉트
```

빌드/실행:

```bash
npm run build
npm run start
```

## 프로젝트 구조

```
app/                     # App Router
  layout.tsx             # 루트(글로벌 CSS import, 패스스루)
  globals.css            # DS globals import + @source/폰트 브리지(앱 스코프)
  concept-c.css          # 마케팅 브랜드 스타일(원본 <style> 포팅, !important 미사용)
  fonts.ts               # next/font (Pretendard/Spoqa/JetBrains Mono)
  [locale]/              # ko/en 세그먼트 (레이아웃/홈/상세/문의/404)
  api/contact/route.ts   # 문의 전송 Route Handler
  sitemap.ts, robots.ts
components/               # 레이아웃/섹션/인터랙티브/상세/SEO 컴포넌트
i18n/                    # next-intl routing/navigation/request
lib/
  content/               # 콘텐츠 스키마 + ContentSource(localSource) + ko/en 데이터
  contact/schema.ts      # zod 공유 검증
  seo/                   # 메타데이터/hreflang/사이트 상수
messages/                # ko.json, en.json (UI 문자열)
packages/ui/             # 벤더링된 UROCK Design System (무수정) + cn 유틸
```

## 디자인 시스템 (단일 소스)

- `packages/ui/src/components/**` 는 DS 원본을 **무수정 벤더링**했습니다.
- `@workspace/ui/*` 별칭(→ `packages/ui/src/*`)으로 참조합니다. `cn` 은 `@workspace/ui/utils`.
- 앱은 실제 사용하는 DS 컴포넌트만 직접 import 합니다(배럴 회피).
- `packages/ui/src/styles/globals.css` 에서 조정한 부분은 **빌드 자산 배선뿐**입니다:
  `@source`(파일 스캔 경로)와 `@font-face src`(리포에 존재하는 `.otf` 경로). 토큰/클래스/컴포넌트는 불변입니다.
- 브랜드 다크 팔레트(#0F0E17 등)는 DS 토큰이 아니므로 `concept-c.css` 에 앱 스코프 토큰으로 분리했습니다.

## 다국어(i18n)

- `next-intl`, 로케일 `ko`(기본)/`en`, `[locale]` 세그먼트 + `middleware.ts`.
- `/` 는 `/ko` 로 리다이렉트, 언어 전환은 헤더의 `LanguageSwitcher`.

## 콘텐츠 레이어 / CMS 대비

- 모든 페이지는 `ContentSource` 인터페이스(`lib/content/source.ts`)를 통해 콘텐츠를 읽습니다.
- 현재는 `localSource`(로컬 ko/en 데이터). 향후 헤드리스 CMS는 `CONTENT_SOURCE=cms` 로
  어댑터만 교체하면 되며, 컴포넌트/페이지 변경이 없습니다.
- CMS 관리자 화면은 커스텀 구현 대신 헤드리스 CMS 자체 관리자 사용을 전제로 합니다.

## 문의 폼

- `components/interactive/ContactForm.tsx` + `app/api/contact/route.ts`.
- 검증: `lib/contact/schema.ts` 의 zod 스키마(클라이언트/서버 공유).
- 스팸 방지 다층: 허니팟(조용한 성공) · 타임트랩 · (선택)Cloudflare Turnstile · 인메모리 레이트리밋.
- 메일 전송: Resend HTTP API. `RESEND_API_KEY`/`CONTACT_TO_EMAIL` 미설정 시 서버 로그로만 기록.

## 환경 변수 (`.env.local`)

`.env.example` 참고:

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | canonical/hreflang/sitemap 절대 URL |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | 문의 메일 전송 |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | CAPTCHA(선택) |
| `CONTENT_SOURCE` | `local`(기본) 또는 `cms`(향후) |

## SEO

- 로케일별 `generateMetadata`(title/description/OpenGraph/Twitter), canonical, hreflang(`x-default` 포함).
- `sitemap.xml`, `robots.txt`, 홈 `Organization` JSON-LD.

## 배포 (Vercel 권장)

1. 저장소를 GitHub 등에 푸시.
2. Vercel에서 프로젝트 import (프레임워크: Next.js 자동 감지).
3. 프로젝트 설정 → Environment Variables 에 위 변수 등록(`NEXT_PUBLIC_SITE_URL` 은 배포 도메인).
4. Deploy. 정적 페이지는 프리렌더되고, 문의 API는 서버 함수로 동작합니다.

## 레거시(이전 원본)

`Concept C - Computational.dc.html`, `support.js`, `_ds/`, `uploads/` 는 이전 프로토타입 자산입니다.
빌드/타입체크에서 제외되어 있으며(`next.config.ts`/`tsconfig.json`), 검수 후 별도 승인 시 제거 예정입니다.
```
