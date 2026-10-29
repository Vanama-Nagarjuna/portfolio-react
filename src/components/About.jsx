import { profile } from "../data";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about">
      <h2 className="t">About Me</h2>
      <Reveal className="about">
        <div>
          <p>I’m <b>Vanamala Nagarjuna</b> from <b>Anantapur, Andhra Pradesh</b>, an aspiring <b>Software Development Engineer</b> pursuing <b>MCA in Data Science</b> at Takshashila University, Ongur, Villupuram (in collaboration with TransOrg Analytics).</p>
          <p>I completed a <b>Software Development Internship at QubicGen Software</b>, where I worked with senior engineers on the <b>Vidhyanthara</b> project, building landing pages and user-facing modules while following real industry practices.</p>
          <p>I’m strong in <b>Java, SQL and DSA</b>, and I keep building and publishing projects on GitHub. I’m now looking for a <b>Software Development Internship</b> where I can contribute to production-grade systems and keep growing.</p>
        </div>
        <div className="info">
          <div><span>Location</span>Anantapur, Andhra Pradesh, India</div>
          <div><span>Currently</span>MCA – Data Science (2025–2027)</div>
          <div><span>Looking for</span>Software Development Internship</div>
          <div><span>Email</span>{profile.email}</div>
        </div>
      </Reveal>
    </section>
  );
}
