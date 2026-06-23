#!/usr/bin/env python3
"""
Tách / ghép slide presentation.

Nguồn chỉnh sửa (agents):  slides/slide_N.html  — chỉ thẻ <section>
Toàn bộ deck (generated):   general_slide.html

Chạy sau khi sửa fragment:
  python build_slides.py
  python build_slides.py --from-monolith   # tách lại từ general_slide.html
"""

from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SLIDES_DIR = ROOT / "slides"
PARTIALS = ROOT / "partials"
TOTAL = 29


def read_partial(name: str) -> str:
    return (PARTIALS / name).read_text(encoding="utf-8")


def head_html(title: str) -> str:
    return "<!DOCTYPE html>\n<html lang=\"vi\">\n<head>\n" + read_partial("head.html").replace("{{TITLE}}", title) + "\n</head>\n"


def scripts_block() -> str:
    return """  <script src="slide-deco.js"></script>
  <script src="slide-charts.js"></script>
  <script src="slide-deck.js"></script>
  <script src="slide-charts-init.js"></script>
"""


def nav_html() -> str:
    return """  <nav class="nav" id="nav">
    <button type="button" id="prev">← Trước</button>
    <span id="indicator">1 / 29</span>
    <button type="button" id="next">Sau →</button>
  </nav>
"""


def extract_sections_from_monolith(monolith: Path) -> list[str]:
    text = monolith.read_text(encoding="utf-8")
    pattern = re.compile(
        r"<!--\s*SLIDE\s+(\d+)\s*-->\s*(<section\b.*?</section>)",
        re.DOTALL | re.IGNORECASE,
    )
    found = pattern.findall(text)
    if len(found) != TOTAL:
        raise SystemExit(f"Expected {TOTAL} slides, found {len(found)} in {monolith}")
    found.sort(key=lambda x: int(x[0]))
    return [section.strip() for _, section in found]


def strip_active_class(section: str) -> str:
    return re.sub(r'(\s)active(?=")', r"\1", section)


def ensure_active_class(section: str, active: bool) -> str:
    section = strip_active_class(section)
    if not active:
        return section
    return re.sub(
        r'(<section\b[^>]*\bclass=")([^"]*)"',
        lambda m: f'{m.group(1)}{m.group(2)} active"',
        section,
        count=1,
    )


def write_fragment(n: int, section: str) -> None:
    SLIDES_DIR.mkdir(parents=True, exist_ok=True)
    path = SLIDES_DIR / f"slide_{n}.html"
    path.write_text(strip_active_class(section.strip()) + "\n", encoding="utf-8")


def build_general(sections: list[str]) -> str:
    parts = [head_html("HRIS — Toàn bộ Presentation (29 slides)")]
    parts.append("<body>\n  <div class=\"deck\" id=\"deck\" data-total-slides=\"29\">\n")
    for i, section in enumerate(sections, start=1):
        active = i == 1
        parts.append(f"    <!-- SLIDE {i} -->\n")
        parts.append("    " + ensure_active_class(section, active).replace("\n", "\n    ") + "\n\n")
    parts.append("  </div>\n\n")
    parts.append(nav_html())
    parts.append(scripts_block())
    parts.append("</body>\n</html>\n")
    return "".join(parts)


def load_fragments() -> list[str]:
    sections = []
    for n in range(1, TOTAL + 1):
        path = SLIDES_DIR / f"slide_{n}.html"
        if not path.exists():
            raise SystemExit(f"Missing fragment: {path}")
        sections.append(path.read_text(encoding="utf-8").strip())
    return sections


def split_monolith(monolith: Path) -> None:
    sections = extract_sections_from_monolith(monolith)
    for n, section in enumerate(sections, start=1):
        write_fragment(n, section)
    print(f"Wrote {TOTAL} fragments to {SLIDES_DIR}/")


def build_all() -> None:
    sections = load_fragments()
    general = build_general(sections)
    (ROOT / "general_slide.html").write_text(general, encoding="utf-8")
    print("Built general_slide.html")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build HRIS presentation slides")
    parser.add_argument(
        "--from-monolith",
        action="store_true",
        help="Split general_slide.html into slides/slide_N.html fragments first",
    )
    parser.add_argument(
        "--monolith",
        type=Path,
        default=ROOT / "general_slide.html",
        help="Source monolith for --from-monolith",
    )
    args = parser.parse_args()

    if args.from_monolith:
        if not args.monolith.exists():
            raise SystemExit(f"Monolith not found: {args.monolith}")
        split_monolith(args.monolith)

    if not SLIDES_DIR.exists() or not any(SLIDES_DIR.glob("slide_*.html")):
        if args.monolith.exists():
            print("No fragments found — splitting from monolith…")
            split_monolith(args.monolith)
        else:
            raise SystemExit("No slides/slide_N.html fragments. Run with --from-monolith first.")

    build_all()


if __name__ == "__main__":
    main()
