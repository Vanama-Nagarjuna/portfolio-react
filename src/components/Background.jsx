import { useEffect, useRef } from "react";

export default function Background() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current, cx = cv.getContext("2d");
    let P = [], raf;
    const resize = () => {
      cv.width = innerWidth; cv.height = innerHeight;
      P = Array.from({ length: Math.min(70, innerWidth / 18) }, () => ({
        x: Math.random() * cv.width, y: Math.random() * cv.height,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      }));
    };
    const draw = () => {
      cx.clearRect(0, 0, cv.width, cv.height);
      const col = getComputedStyle(document.documentElement).getPropertyValue("--acc").trim() || "#5eead4";
      cx.fillStyle = col; cx.strokeStyle = col;
      P.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > cv.width) p.vx *= -1;
        if (p.y < 0 || p.y > cv.height) p.vy *= -1;
        cx.globalAlpha = 0.5; cx.beginPath(); cx.arc(p.x, p.y, 1.6, 0, 6.3); cx.fill();
        for (let j = i + 1; j < P.length; j++) {
          const d = Math.hypot(p.x - P[j].x, p.y - P[j].y);
          if (d < 120) {
            cx.globalAlpha = (1 - d / 120) * 0.18;
            cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(P[j].x, P[j].y); cx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);
  return <canvas id="bg" ref={ref} />;
}
