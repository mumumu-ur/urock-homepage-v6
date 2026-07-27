import { Link } from "@/i18n/navigation";
import type { NavCta } from "@/lib/nav/ia";
import { DownloadIcon } from "./icons";

/** Header CTA cluster: brochure download (text link), demo request
 * (outlined), contact (filled/primary emphasis). Order/labels come from the
 * confirmed IA (lib/nav/ia.ts) — do not reorder without instruction.
 * Colors port Figma's GNB button styles 1:1 to existing DS tokens:
 * text-05-dark (#b7ccff) for the brochure/demo button text, line-03
 * (#93b0f8) for the outlined demo button's border, primary-01 (#628cf5) for
 * the filled contact button's background with text-00 (#f5f7fa) for its
 * text — all exact matches, no new tokens needed. Plain DS utility
 * classNames are sufficient here: `app/concept-c.css` (the `.cC a` teal
 * link color, etc.) lives in the low-priority `concept-c` cascade layer
 * (order fixed in app/globals.css), so any DS token class always wins
 * without needing an inline-style override.
 * The brochure PDF asset does not exist yet in /public; the link is wired to
 * the intended path and will 404 until a real file is added (see completion
 * report). Hidden below 901px — MobileNav's sheet renders the same CTA list
 * for small screens. */
export function HeaderCta({ cta }: { cta: NavCta[] }) {
  // ia.ts stores `cta` as [brochure, demo, contact] (Figma's left-to-right
  // order: text link, outline button, filled button) — destructure in that
  // same order, not [contact, demo, brochure], or labels/hrefs/the
  // download-only `<a>` land on the wrong button.
  const [brochure, demo, contact] = cta;
  return (
    <div className="hidden items-center gap-2 min-[901px]:flex">
      {brochure ? (
        <a
          href={brochure.href}
          download
          className="inline-flex items-center gap-1.5 whitespace-nowrap px-2 py-3 text-14 font-medium tracking-tight-05 text-05-dark hover:opacity-80"
        >
          {brochure.label}
          <DownloadIcon size={18} />
        </a>
      ) : null}
      {demo ? (
        <Link
          href={demo.href}
          className="inline-flex h-7.5 items-center justify-center whitespace-nowrap rounded-frame-8 border-[1.5px] border-line-03 bg-bg-03/10 px-2 py-1 text-14 font-medium tracking-tight-05 text-05-dark shadow-[-1px_5px_14px_0px_rgba(98,140,245,0.16)] transition-opacity hover:opacity-90"
        >
          {demo.label}
        </Link>
      ) : null}
      {contact ? (
        <Link
          href={contact.href}
          className="primary-01 inline-flex h-7.5 items-center justify-center whitespace-nowrap rounded-frame-8 px-2 py-1 text-14 font-medium tracking-tight-05 text-00 drop-shadow-[-1px_5px_7px_rgba(98,140,245,0.16)] transition-opacity hover:opacity-90"
        >
          {contact.label}
        </Link>
      ) : null}
    </div>
  );
}
