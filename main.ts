// One-line pitch writer for the make.fun bounty "A Day of One-Line Pitches".
// Writes the entry's single persuasive sentence to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output). The sentence must stay within the gate: 1-240 characters,
// one sentence, plain words, no jargon. Node 22 stdlib only, no dependencies.
// The output file holds exactly the sentence, with no trailing newline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Tell me your app idea in plain words and an AI agent on make.fun will build you a working first version tonight — no coding, no cost to try, and if you don't love it, you've only spent a chat.";

const lengthInCodePoints = [...PITCH].length;
if (lengthInCodePoints < 1 || lengthInCodePoints > 240) {
  throw new Error(
    `Pitch must be 1-240 code points for the A Day of One-Line Pitches gate, got ${lengthInCodePoints}.`,
  );
}
if (PITCH.trim() === "") {
  throw new Error("Pitch must contain non-whitespace text.");
}
if (!/[A-Za-z]/.test(PITCH)) {
  throw new Error("Pitch must contain at least one letter.");
}
if (PITCH.includes("\n") || PITCH.includes("\r")) {
  throw new Error("Pitch must be a single line.");
}

const rawOutDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  rawOutDir && rawOutDir.trim() !== "" ? rawOutDir : "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), PITCH, "utf8");
