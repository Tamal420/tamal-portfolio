const sharp = require("sharp");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");
const BG = "#0A0A0A";
const GREEN = "#00C278";

async function makeFaviconPng(size, outPath) {
  const fontSize = Math.round(size * 0.42);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="${BG}"/>
  <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="${fontSize}" fill="${GREEN}" letter-spacing="-1">TS</text>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(outPath);
}

async function makeIco() {
  const png16 = await sharp(Buffer.from(`<?xml version="1.0"?>
<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
  <rect width="16" height="16" fill="${BG}"/>
  <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="8" fill="${GREEN}">TS</text>
</svg>`)).png().toBuffer();

  const png32 = await sharp(Buffer.from(`<?xml version="1.0"?>
<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="${BG}"/>
  <text x="50%" y="53%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, Helvetica, sans-serif" font-weight="700"
        font-size="14" fill="${GREEN}">TS</text>
</svg>`)).png().toBuffer();

  const images = [png16, png32];
  const headerSize = 6;
  const dirEntrySize = 16;
  const dirSize = headerSize + dirEntrySize * images.length;
  let offset = dirSize;
  const entries = [];
  for (const img of images) {
    const meta = await sharp(img).metadata();
    const w = meta.width === 256 ? 0 : meta.width;
    const h = meta.height === 256 ? 0 : meta.height;
    entries.push({ w, h, size: img.length, offset, data: img });
    offset += img.length;
  }

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(images.length, 4);
  let pos = 6;
  for (const e of entries) {
    buf.writeUInt8(e.w, pos); pos += 1;
    buf.writeUInt8(e.h, pos); pos += 1;
    buf.writeUInt8(0, pos); pos += 1;
    buf.writeUInt8(0, pos); pos += 1;
    buf.writeUInt16LE(1, pos); pos += 2;
    buf.writeUInt16LE(32, pos); pos += 2;
    buf.writeUInt32LE(e.size, pos); pos += 4;
    buf.writeUInt32LE(e.offset, pos); pos += 4;
  }
  for (const e of entries) {
    e.data.copy(buf, e.offset);
  }
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), buf);
}

function makeCvPdf() {
  return new Promise((resolve, reject) => {
    const out = path.join(publicDir, "Tamal-Saha-QA-CV.pdf");
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 48, bottom: 48, left: 56, right: 56 },
    });
    const stream = fs.createWriteStream(out);
    doc.pipe(stream);

    const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    let y = 36;

    doc.rect(0, 0, doc.page.width, 8).fill(GREEN);

    doc.fillColor(BG).font("Helvetica-Bold").fontSize(26).text("Tamal Saha", 56, y, { width: pageWidth });
    y = doc.y + 4;
    doc.fillColor(GREEN).font("Helvetica-Bold").fontSize(12)
      .text("Associate SQA Engineer", 56, y, { width: pageWidth });
    y = doc.y + 2;
    doc.fillColor("#444444").font("Helvetica").fontSize(10)
      .text("Kaz Software  ·  Dhaka, Bangladesh", 56, y, { width: pageWidth });
    y = doc.y + 10;

    doc.fillColor("#222222").font("Helvetica").fontSize(9);
    const email = "tamalsaha700.ts@gmail.com";
    const github = "https://github.com/Tamal420";
    doc.text(email + "  ·  " + github, 56, y, { width: pageWidth });
    y = doc.y + 14;

    doc.moveTo(56, y).lineTo(56 + pageWidth, y).strokeColor(GREEN).lineWidth(1.5).stroke();
    y += 16;

    function section(title) {
      doc.fillColor(BG).font("Helvetica-Bold").fontSize(11).text(title.toUpperCase(), 56, y, { width: pageWidth, characterSpacing: 1 });
      y = doc.y + 3;
      doc.moveTo(56, y).lineTo(56 + pageWidth, y).strokeColor("#DDDDDD").lineWidth(0.8).stroke();
      y += 10;
    }

    section("Professional Summary");
    doc.fillColor("#333333").font("Helvetica").fontSize(10);
    const summary =
      "QA engineer focused on manual testing, API testing, and RBAC validation for healthcare SaaS across web and mobile. Experienced delivering quality across multi-product portfolios in healthcare, EdTech, and music streaming. Currently expanding automation skills with Playwright and Python.";
    doc.text(summary, 56, y, { width: pageWidth, align: "left", lineGap: 2 });
    y = doc.y + 16;

    section("Experience");
    doc.fillColor(BG).font("Helvetica-Bold").fontSize(11).text("Associate SQA Engineer", 56, y, { continued: true });
    doc.fillColor("#666666").font("Helvetica").fontSize(10).text("  |  Kaz Software", { continued: false });
    y = doc.y + 2;
    doc.fillColor(GREEN).font("Helvetica").fontSize(9).text("2023 – Present  ·  Dhaka, Bangladesh", 56, y);
    y = doc.y + 8;
    doc.fillColor("#333333").font("Helvetica").fontSize(10);
    const bullets = [
      "Perform manual, regression, smoke, and end-to-end testing for web and mobile applications.",
      "Validate APIs using Postman, Swagger, and browser DevTools; verify RBAC and access-control scenarios.",
      "Support QA across products including WebEVV, ExpertEVV, Dignify, Hakma, Kreebo Learn, and BandScore9 spanning healthcare SaaS, EdTech, and music streaming.",
      "Execute mobile testing on Android and iOS, including BrowserStack-assisted coverage.",
      "Collaborate with engineering to document defects, reproduce issues, and confirm fixes before release.",
    ];
    for (const b of bullets) {
      doc.circle(64, y + 4, 1.6).fill(GREEN);
      doc.fillColor("#333333").text(b, 74, y, { width: pageWidth - 18, lineGap: 1.5 });
      y = doc.y + 6;
    }
    y += 10;

    section("Skills");
    const skills = [
      ["Testing", "Manual testing, Regression, Smoke, E2E, RBAC validation"],
      ["API", "Postman, Swagger, Browser DevTools"],
      ["Mobile", "Android, iOS, BrowserStack"],
      ["Automation", "Playwright (learning), Python (learning)"],
      ["Domains", "Healthcare SaaS, EdTech, Music streaming"],
    ];
    for (const [label, value] of skills) {
      doc.fillColor(BG).font("Helvetica-Bold").fontSize(10).text(label, 56, y, { width: 90, continued: false });
      const labelBottom = doc.y;
      doc.fillColor("#333333").font("Helvetica").fontSize(10).text(value, 150, y, { width: pageWidth - 94 });
      y = Math.max(labelBottom, doc.y) + 6;
    }
    y += 10;

    section("Products Worked On");
    doc.fillColor("#333333").font("Helvetica").fontSize(10);
    doc.text(
      "WebEVV · ExpertEVV · Dignify · Hakma · Kreebo Learn · BandScore9",
      56,
      y,
      { width: pageWidth }
    );

    doc.fillColor("#888888").font("Helvetica").fontSize(8)
      .text("Curriculum Vitae — Tamal Saha  ·  Available upon request for full project details", 56, doc.page.height - 40, {
        width: pageWidth,
        align: "center",
      });

    doc.end();
    stream.on("finish", resolve);
    stream.on("error", reject);
  });
}

(async () => {
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  await makeFaviconPng(16, path.join(publicDir, "favicon-16x16.png"));
  await makeFaviconPng(180, path.join(publicDir, "apple-touch-icon.png"));
  await makeIco();
  await makeCvPdf();
  const files = [
    "photo.jpg",
    "og-image.png",
    "favicon.ico",
    "favicon-16x16.png",
    "apple-touch-icon.png",
    "Tamal-Saha-QA-CV.pdf",
  ];
  for (const f of files) {
    const p = path.join(publicDir, f);
    const st = fs.statSync(p);
    console.log(f + "\t" + st.size);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
