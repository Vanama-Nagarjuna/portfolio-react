import { useState } from "react";
import { experience } from "../data";
import { useStored, copyText, useOwner } from "../hooks";
import Reveal from "./Reveal";

const blank = { title: "", org: "", date: "", points: "", months: "" };

export default function Experience() {
  const { owner: canEdit } = useOwner();
  const [mine, setMine] = useStored("myExperience", []);
  const [open, setOpen] = useState(false);
  const [f, setF] = useState(blank);
  const all = [...mine.map((e, i) => ({ ...e, own: true, i })), ...experience];

  const save = () => {
    if (!f.title.trim() || !f.org.trim()) return alert("Role and company are required");
    const points = f.points.split("\n").map((x) => x.trim()).filter(Boolean);
    setMine([{ title: f.title.trim(), org: f.org.trim(), date: f.date.trim(), months: +f.months || 0, points }, ...mine]);
    setF(blank); setOpen(false);
  };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <section id="experience">
      <h2 className="t">Experience &amp; Education</h2>
      {canEdit && (
        <div className="pbar">
          <button className="btn p" onClick={() => setOpen(true)}>+ Add Experience</button>
          {mine.length > 0 && <button className="btn" onClick={() => copyText(JSON.stringify(mine, null, 2))}>Copy for data.js</button>}
        </div>
      )}
      {all.map((e, i) => (
        <Reveal key={e.title + e.org + i} className="tl" delay={i * 0.1}>
          <h3>{e.title} · <em>{e.org}</em></h3>
          <small>{e.date}</small>
          {e.points && e.points.length ? <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul> : e.text ? <p>{e.text}</p> : null}
          {e.own && canEdit && <button className="x" onClick={() => setMine(mine.filter((_, x) => x !== e.i))}>Delete</button>}
        </Reveal>
      ))}

      {open && (
        <div id="modal" className="on" onClick={(e) => e.target.id === "modal" && setOpen(false)}>
          <div className="box">
            <h3>Add Experience</h3>
            <label>Role</label><input placeholder="Software Engineer" value={f.title} onChange={set("title")} />
            <label>Company</label><input placeholder="Company name" value={f.org} onChange={set("org")} />
            <label>Duration</label><input placeholder="Aug 2026 – Present" value={f.date} onChange={set("date")} />
            <label>Months worked (number, Home counter lo add avthundi)</label><input type="number" min="0" value={f.months} onChange={set("months")} />
            <label>What you did (one point per line)</label>
            <textarea rows="5" value={f.points} onChange={set("points")} />
            <div className="btns"><button className="btn p" onClick={save}>Save</button><button className="btn" onClick={() => setOpen(false)}>Cancel</button></div>
          </div>
        </div>
      )}
    </section>
  );
}
