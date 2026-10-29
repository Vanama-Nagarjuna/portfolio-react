import { useEffect, useRef, useState } from "react";
import { palettes } from "../theme";

export default function Palettes({ index, onPick }) {
  const [open, setOpen] = useState(false);
  // Link ki #demo add chesthe, anni colors okkosari auto ga chupistundi
  const [demo, setDemo] = useState(location.hash === "#demo");
  const cur = useRef(index);
  const steps = useRef(0);
  cur.current = index;

  useEffect(() => {
    if (!demo) return;
    steps.current = 0;
    const t = setInterval(() => {
      steps.current += 1;
      if (steps.current > palettes.length) { setDemo(false); return; }
      onPick((cur.current + 1) % palettes.length);
    }, 2500);
    return () => clearInterval(t);
  }, [demo]);

  return (
    <div id="pal">
      {demo && <div className="palname">{index + 1}/{palettes.length} · {palettes[index].n}</div>}
      {open && (
        <div className="palbox">
          <button className="demo" onClick={() => setDemo(!demo)}>{demo ? "⏸ Stop demo" : "▶ Auto demo (all colors)"}</button>
          {palettes.map((p, i) => (
            <button key={p.n} className={i === index ? "on" : ""} onClick={() => { setDemo(false); onPick(i); }}>
              <i style={{ background: `linear-gradient(135deg, ${p.acc}, ${p.acc2})` }} />
              {i + 1}. {p.n}
            </button>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(!open)} title="Colors">🎨</button>
    </div>
  );
}
