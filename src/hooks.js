import { useEffect, useState } from "react";
import { ownerPassword } from "./data";

export function useTyping(words) {
  const [i, setI] = useState(0);
  const [c, setC] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i];
    let t;
    if (!del && c < w.length) t = setTimeout(() => setC(c + 1), 70);
    else if (!del) t = setTimeout(() => setDel(true), 1400);
    else if (c > 0) t = setTimeout(() => setC(c - 1), 35);
    else { setDel(false); setI((i + 1) % words.length); }
    return () => clearTimeout(t);
  }, [c, del, i, words]);
  return words[i].slice(0, c);
}

export function useScroll(ids) {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const f = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
      let cur = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 140) cur = id;
      });
      setActive(cur);
    };
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, [ids]);
  return { progress, active };
}

// localStorage lo save ayye state. Oka chota marchithe anni components update avthayi
const mem = {};
export function useStored(key, init) {
  const read = () => {
    try { const s = localStorage.getItem(key); if (s) return JSON.parse(s); } catch { /* ignore */ }
    return key in mem ? mem[key] : init;
  };
  const [v, setV] = useState(read);
  useEffect(() => {
    const h = (e) => { if (e.detail === key) setV(read()); };
    addEventListener("stored", h);
    return () => removeEventListener("stored", h);
  }, []);
  const set = (n) => {
    mem[key] = n;
    try { localStorage.setItem(key, JSON.stringify(n)); }
    catch (e) { if (e && e.name === "QuotaExceededError") alert("Browser storage full. Use a smaller image."); }
    dispatchEvent(new CustomEvent("stored", { detail: key }));
  };
  const reset = () => {
    delete mem[key];
    try { localStorage.removeItem(key); } catch { /* ignore */ }
    dispatchEvent(new CustomEvent("stored", { detail: key }));
  };
  return [v, set, reset];
}

// GitHub nunchi live repo count (fail aithe fallback)
export function useRepoCount(user, fallback) {
  const [n, setN] = useState(fallback);
  useEffect(() => {
    fetch(`https://api.github.com/users/${user}`)
      .then((r) => r.json())
      .then((d) => { if (typeof d.public_repos === "number") setN(d.public_repos); })
      .catch(() => {});
  }, [user]);
  return n;
}

export async function copyText(t) {
  try { await navigator.clipboard.writeText(t); alert("Copied!"); }
  catch { window.prompt("Copy this:", t); }
}

// Owner mode: password tho unlock chesthe Add/Delete/Colors/Photo tools kanipisthayi (visitors ki kanipinchavu)
export function useOwner() {
  const [on, setOn] = useStored("owner", false);
  const owner = on || location.hostname === "localhost";
  const unlock = () => {
    const p = window.prompt("Owner password:");
    if (p === ownerPassword) setOn(true);
    else if (p !== null) alert("Wrong password");
  };
  return { owner, unlock, lock: () => setOn(false) };
}
