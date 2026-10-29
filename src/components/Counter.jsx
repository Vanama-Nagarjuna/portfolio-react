import { useEffect, useState } from "react";

export default function Counter({ to, suffix = "" }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const step = Math.ceil(to / 40);
    const t = setInterval(() => {
      setV((x) => {
        if (x + step >= to) { clearInterval(t); return to; }
        return x + step;
      });
    }, 40);
    return () => clearInterval(t);
  }, [to]);
  return <>{v}{suffix}</>;
}
