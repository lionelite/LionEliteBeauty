// Visual QA loop helper: screenshots a page at mobile/tablet/desktop,
// reports console errors, horizontal overflow, broken images and small tap targets.
// Usage: node scripts/visual-qa.mjs http://localhost:3000 [outDir]
import { chromium } from "playwright";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:3000";
const out = process.argv[3] || "qa-shots";
fs.mkdirSync(out, { recursive: true });
const sizes = { mobile: [375, 812], tablet: [768, 1024], desktop: [1440, 900] };

const browser = await chromium.launch({executablePath: process.env.PW_CHROME || undefined});
let problems = 0;
for (const [name, [w, h]] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });

  const report = await page.evaluate(() => {
    const overflow = document.documentElement.scrollWidth > window.innerWidth + 1;
    const brokenImgs = [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
    const smallTaps = [...document.querySelectorAll("a,button,[role=button],input,select")]
      .filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.width < 40 || r.height < 40); })
      .slice(0, 10).map((el) => (el.innerText || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 40));
    return { overflow, brokenImgs, smallTaps };
  });
  const issues = [];
  if (errors.length) issues.push(`console errors: ${errors.slice(0, 5).join(" | ")}`);
  if (report.overflow) issues.push("horizontal overflow");
  if (report.brokenImgs.length) issues.push(`broken images: ${report.brokenImgs.join(", ")}`);
  if (name === "mobile" && report.smallTaps.length) issues.push(`tap targets <40px: ${report.smallTaps.join(", ")}`);
  problems += issues.length;
  console.log(`${name} (${w}px): ${issues.length ? issues.join("; ") : "OK"} -> ${out}/${name}.png`);
  await page.close();
}
await browser.close();
console.log(problems ? `\n${problems} issue(s). Fix, then re-run.` : "\nNo automated issues. Now review the screenshots against design-taste.");
process.exit(problems ? 1 : 0);
