import { useState } from "react";
import { skillGroups } from "../data";
import { useStored, copyText, useOwner } from "../hooks";

export default function Skills() {
  const { owner: canEdit } = useOwner();
  const [groups, setGroups, reset] = useStored("mySkills", skillGroups);
  const names = Object.keys(groups);
  const [tab, setTab] = useState(names[0]);
  const [name, setName] = useState("");
  const [grp, setGrp] = useState("");
  const current = groups[tab] ? tab : names[0];

  const add = () => {
    const n = name.trim(), g = grp.trim() || current;
    if (!n) return;
    const list = groups[g] || [];
    if (list.includes(n)) return;
    setGroups({ ...groups, [g]: [...list, n] });
    setTab(g); setName(""); setGrp("");
  };
  const del = (s) => {
    const list = groups[current].filter((x) => x !== s);
    const next = { ...groups, [current]: list };
    if (!list.length) delete next[current];
    setGroups(next);
  };

  return (
    <section id="skills">
      <h2 className="t">Skills</h2>
      <div className="tabs">
        {names.map((n) => (
          <button key={n} className={`tab${current === n ? " on" : ""}`} onClick={() => setTab(n)}>{n}</button>
        ))}
      </div>
      <div className="chips" key={current}>
        {(groups[current] || []).map((s, i) => (
          <span key={s} className="chip" style={{ animationDelay: `${i * 70}ms` }}>
            {s}{canEdit && <b className="del" onClick={() => del(s)} title="Remove">×</b>}
          </span>
        ))}
      </div>
      {canEdit && (
        <div className="inline">
          <input placeholder="New skill, e.g. Python" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <input list="grps" placeholder={`Group (default: ${current})`} value={grp} onChange={(e) => setGrp(e.target.value)} />
          <datalist id="grps">{names.map((n) => <option key={n} value={n} />)}</datalist>
          <button className="btn p" onClick={add}>+ Add Skill</button>
          <button className="btn" onClick={() => copyText(JSON.stringify(groups, null, 2))}>Copy for data.js</button>
          <button className="btn" onClick={reset}>Reset</button>
        </div>
      )}
    </section>
  );
}
