import { useState } from "react";
import { profile } from "../data";
import { useOwner } from "../hooks";
import Reveal from "./Reveal";

export default function Contact() {
  const { owner, unlock, lock } = useOwner();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { window.prompt("Copy email:", profile.email); }
  };
  return (
    <section id="contact" className="contact">
      <h2 className="t">Get In Touch</h2>
      <Reveal>
        <p>I’m open to Software Development internships and entry-level roles. My inbox is always open.</p>
        <div className="cl">
          <a href={`mailto:${profile.email}`}><span>Email</span><b>{profile.email}</b></a>
          <a href={`tel:${profile.phoneLink}`}><span>Phone</span><b>{profile.phone}</b></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer"><span>LinkedIn</span><b>vanamalanagarjuna</b></a>
          <a href={profile.github} target="_blank" rel="noreferrer"><span>GitHub</span><b>{profile.githubUser}</b></a>
          <a href="https://www.google.com/maps/search/Anantapur,+Andhra+Pradesh" target="_blank" rel="noreferrer"><span>Location</span><b>Anantapur, Andhra Pradesh, India</b></a>
        </div>
        <div className="btns" style={{ justifyContent: "center" }}>
          <button className="btn" onClick={copy}>{copied ? "✓ Copied!" : "📋 Copy email"}</button>
        </div>
      </Reveal>
      <footer>
        © 2026 Vanamala Nagarjuna · Anantapur, Andhra Pradesh, India
        <button className="lock" onClick={owner ? lock : unlock} title="Owner">{owner ? "🔓" : "🔒"}</button>
      </footer>
    </section>
  );
}
