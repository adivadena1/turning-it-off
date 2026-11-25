import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One funny line a hopeless tech support agent says to a desperate
// customer. The classic "turn it off and on again" is twisted: the
// agent applies it to himself, then admits it is the only fix he knows.
const LINE =
  "Hold on, I'm turning myself off and on again. It's the only fix I actually know.";

const OUT = "/output/entry.txt";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 199
// characters, not only white space, on a single line.
function main(): void {
  if (LINE.length < 1 || LINE.length > 199) {
    throw new Error(`entry must be 1-199 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync(OUT, LINE, "utf8");
  // Read-back verification: the gate scores exactly the bytes on disk,
  // so refuse to exit 0 unless the file holds exactly the validated line.
  if (readFileSync(OUT, "utf8") !== LINE) {
    throw new Error("read-back mismatch: /output/entry.txt differs from LINE");
  }
}

main();
