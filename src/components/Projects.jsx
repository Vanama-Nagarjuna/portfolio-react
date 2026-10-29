import { useEffect, useRef, useState } from "react";
import { projects, profile } from "../data";
import { useStored, useOwner } from "../hooks";

function Card({ p, onDelete }) {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  };
  const bg = p.img ? { backgroundImage: `url(${p.img})`, fontSize: 0 } : {};
  return (
    <div ref={ref} className="card" onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = "")}>
      <div className="thumb" style={bg}>{p.e || "🚀"}</div>
      <div className="cb">
        <h3>{p.t}</h3>
        <p>{p.d}</p>
        <div className="tech">{p.k.map((x) => <span key={x}>{x}</span>)}</div>
        <div>
          {p.live && <a className="lnk" href={p.live} target="_blank" rel="noreferrer">Live Demo ↗</a>}
          {(p.code || p.l) && <a className="lnk" href={p.code || p.l} target="_blank" rel="noreferrer">Code ↗</a>}
          {onDelete && <button className="x" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </div>
  );
}

const empty = { t: "", d: "", k: "", live: "", code: "", img: "" };

export default function Projects() {
  const { owner: canEdit } = useOwner();
  const slider = useRef(null);
  const [mine, persist] = useStored("myProjects", []);
  const [repos, setRepos] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(empty);

  // GitHub nunchi repos automatic ga load avthayi
  useEffect(() => {
    fetch(`https://api.github.com/users/${profile.githubUser}/repos?sort=updated&per_page=20`)
      .then((r) => r.json())
      .then((list) => {
        if (!Array.isArray(list)) return;
        const names = projects.map((p) => p.t.toLowerCase().replace(/\s/g, ""));
        setRepos(
          list
            .filter((r) => !r.fork && !names.includes(r.name.toLowerCase().replace(/[_-]/g, "")))
            .map((r) => ({ t: r.name.replace(/[_-]/g, " "), d: r.description || "Repository on GitHub.", k: [r.language || "Code"], l: r.html_url, e: "📁" }))
        );
      })
      .catch(() => {});
  }, []);

  const pickImage = (file) => {
    if (!file) return;
    const r = new FileReader();
    r.onload = () => setForm((f) => ({ ...f, img: r.result }));
    r.readAsDataURL(file);
  };
  const save = () => {
    if (!form.t.trim()) return alert("Enter a title");
    persist([{ ...form, d: form.d || "—", k: form.k.split(",").map((x) => x.trim()).filter(Boolean) }, ...mine]);
    setForm(empty); setOpen(false);
  };
  const scroll = (n) => slider.current.scrollBy({ left: n, behavior: "smooth" });

  const all = [
    ...mine.map((p, i) => ({ ...p, own: true, i, key: "m" + i })),
    ...projects.map((p) => ({ ...p, key: p.t })),
    ...repos.map((p) => ({ ...p, key: p.l })),
  ];
  const tags = ["All", ...new Set(all.flatMap((p) => p.k))];
  const [flt, setFlt] = useState("All");
  const shown = flt === "All" ? all : all.filter((p) => p.k.includes(flt));

  return (
    <section id="projects">
      <h2 className="t">Projects</h2>
      <div className="pbar">
        {canEdit ? <button className="btn p" onClick={() => setOpen(true)}>+ Add Project</button> : <span />}
        <div className="nav2"><button onClick={() => scroll(-340)}>←</button><button onClick={() => scroll(340)}>→</button></div>
      </div>
      <div className="tabs">
        {tags.map((t) => <button key={t} className={`tab${flt === t ? " on" : ""}`} onClick={() => setFlt(t)}>{t}</button>)}
      </div>
      <div className="slider" ref={slider}>
        {shown.map((p) => <Card key={p.key} p={p} onDelete={p.own && canEdit ? () => persist(mine.filter((_, x) => x !== p.i)) : null} />)}
      </div>

      {open && (
        <div id="modal" className="on" onClick={(e) => e.target.id === "modal" && setOpen(false)}>
          <div className="box">
            <h3>Add a Project</h3>
            <label>Title</label><input value={form.t} onChange={(e) => setForm({ ...form, t: e.target.value })} />
            <label>Description</label><textarea rows="3" value={form.d} onChange={(e) => setForm({ ...form, d: e.target.value })} />
            <label>Tech (comma separated)</label><input placeholder="HTML, CSS, JavaScript" value={form.k} onChange={(e) => setForm({ ...form, k: e.target.value })} />
            <label>Live demo link (website open ayye link)</label><input placeholder="https://myproject.vercel.app" value={form.live} onChange={(e) => setForm({ ...form, live: e.target.value })} />
            <label>GitHub code link</label><input placeholder="https://github.com/..." value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            <label>Screenshot (optional)</label><input type="file" accept="image/*" onChange={(e) => pickImage(e.target.files[0])} />
            <div className="btns"><button className="btn p" onClick={save}>Save</button><button className="btn" onClick={() => setOpen(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </section>
  );
}
