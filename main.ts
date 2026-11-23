// One Emoji, One Smile — entry for make.fun
// Writes exactly one emoji to /output/entry.txt.
//
// ATM (Amati, Tiru, Modifikasi): the judge is a warmth judge that compares
// two emojis at a time, weighing (1) warm and friendly, (2) warmth at first
// glance, (3) universality, (4) chosen rather than default, (5) right for a
// stranger. The obvious defaults (🙂, 😊, 😄) lose on criterion 4 — the
// brief says the pick should feel chosen, not the first smiley that comes
// to mind. 🥰 loses on criterion 5 (hearts read as affectionate from a
// stranger). 🤗 HUGGING FACE is the pick: open arms and a smile, warm at
// first glance, the same read for any age or background, clearly a chosen
// gesture rather than a default smiley, and welcoming without intimacy,
// sarcasm or flirtation. It is a single code point, so it clears the
// 1–8 character gate with room to spare.
import { mkdirSync, writeFileSync } from "node:fs";

const EMOJI = "🤗";

function main(): void {
  // Gate check, mirroring the sealed scorer: UTF-8 text of 1 to 8
  // characters, not only white space.
  const chars = [...EMOJI];
  if (chars.length < 1 || chars.length > 8) {
    throw new Error(`entry must be 1-8 characters, got ${chars.length}`);
  }
  if (EMOJI.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  try {
    mkdirSync(outDir, { recursive: true });
    writeFileSync(`${outDir}/entry.txt`, EMOJI, "utf8");
  } catch {
    // The grading sandbox always provides /output, but a local run may
    // not have it writable — fall back to a local output/ directory.
    mkdirSync("output", { recursive: true });
    writeFileSync("output/entry.txt", EMOJI, "utf8");
    console.log(`wrote ${chars.length} character(s) to output/entry.txt`);
    return;
  }
  const codePoint = EMOJI.codePointAt(0)?.toString(16).toUpperCase();
  console.log(
    `wrote ${chars.length} character(s) (U+${codePoint}) to ${outDir}/entry.txt`,
  );
}

main();
