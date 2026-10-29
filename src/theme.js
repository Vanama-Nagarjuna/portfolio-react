export const palettes = [
  { n: "Aqua Indigo", bg: "#070b18", bg2: "#0e1428", card: "#121a35", line: "#222c55", acc: "#5eead4", acc2: "#818cf8" },
  { n: "Electric Blue", bg: "#060d1f", bg2: "#0c1730", card: "#101d3d", line: "#1f3263", acc: "#38bdf8", acc2: "#3b82f6" },
  { n: "Royal Violet", bg: "#0b0716", bg2: "#130d26", card: "#1a1233", line: "#2c2354", acc: "#a78bfa", acc2: "#ec4899" },
  { n: "Sunset Orange", bg: "#120a07", bg2: "#1c110c", card: "#241812", line: "#3b2a20", acc: "#fb923c", acc2: "#f43f5e" },
  { n: "Emerald", bg: "#04120d", bg2: "#081c15", card: "#0c2a20", line: "#144232", acc: "#34d399", acc2: "#22d3ee" },
  { n: "Rose Gold", bg: "#140a0e", bg2: "#1e1017", card: "#28151f", line: "#402333", acc: "#fda4af", acc2: "#fbbf24" },
  { n: "Gold Black", bg: "#0a0a0a", bg2: "#141414", card: "#1a1a1a", line: "#2e2a1c", acc: "#fbbf24", acc2: "#f59e0b" },
  { n: "Crimson", bg: "#12060a", bg2: "#1c0a10", card: "#260e16", line: "#411a26", acc: "#fb7185", acc2: "#ef4444" },
  { n: "Cyber Lime", bg: "#070d06", bg2: "#0e1a0b", card: "#132310", line: "#223a1c", acc: "#a3e635", acc2: "#22c55e" },
  { n: "Slate Mono", bg: "#0b0f14", bg2: "#121820", card: "#171f29", line: "#263140", acc: "#e2e8f0", acc2: "#94a3b8" },
  { n: "Navy & Gold", bg: "#050a1f", bg2: "#0a1230", card: "#0f1a40", line: "#1f2d63", acc: "#e6c35c", acc2: "#4f6bff" },
  { n: "Deep Ocean", bg: "#03141f", bg2: "#061f2e", card: "#0a2a3d", line: "#12435c", acc: "#22d3ee", acc2: "#0284c7" },
  { n: "Neon Orchid", bg: "#0d0618", bg2: "#150a28", card: "#1d0f38", line: "#34205e", acc: "#e879f9", acc2: "#8b5cf6" },
  { n: "Coral Peach", bg: "#140c0c", bg2: "#1e1212", card: "#281818", line: "#402828", acc: "#ff8a80", acc2: "#ffb74d" },
  { n: "Mint Fresh", bg: "#061512", bg2: "#0a201b", card: "#0e2c25", line: "#174539", acc: "#6ee7b7", acc2: "#2dd4bf" },
  { n: "Amber Fire", bg: "#130c04", bg2: "#1d1307", card: "#271a0b", line: "#42300f", acc: "#ffb020", acc2: "#ff5d2e" },
  { n: "Magenta Pop", bg: "#14061a", bg2: "#1e0a28", card: "#290e36", line: "#431a58", acc: "#ff4fd8", acc2: "#7c3aed" },
  { n: "Ice Blue", bg: "#070e1a", bg2: "#0d1728", card: "#121f36", line: "#22345a", acc: "#93c5fd", acc2: "#c4b5fd" },
  { n: "Forest Green", bg: "#06100a", bg2: "#0b1a11", card: "#10241a", line: "#1b3b29", acc: "#4ade80", acc2: "#a3e635" },
  { n: "Ruby Red", bg: "#14060a", bg2: "#1e0a10", card: "#28101a", line: "#431c2a", acc: "#ff4d6d", acc2: "#ff8fa3" },
];

// Palette dark theme lo matrame apply avthundi
export function applyPalette(p, light) {
  const s = document.documentElement.style;
  ["bg", "bg2", "card", "line", "acc", "acc2"].forEach((k) =>
    light ? s.removeProperty("--" + k) : s.setProperty("--" + k, p[k])
  );
}
