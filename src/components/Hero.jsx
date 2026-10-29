import { roles, experience, projects, profile, fallbackRepos } from "../data";
import { useTyping, useStored, useRepoCount } from "../hooks";
import Reveal from "./Reveal";
import Counter from "./Counter";
import Photo from "./Photo";

export default function Hero() {
  const text = useTyping(roles);
  // Stats automatic ga update avthayi (experience / projects add chesthe, GitHub lo repo create chesthe)
  const [exp] = useStored("myExperience", []);
  const [mine] = useStored("myProjects", []);
  const repos = useRepoCount(profile.githubUser, fallbackRepos);
  const months = [...exp, ...experience].reduce((a, e) => a + (+e.months || 0), 0);
  const total = projects.length + mine.length;
  return (
    <section id="home" className="hero">
      <Reveal>
        <small>Hi, my name is</small>
        <h1>Vanamala <span className="grad">Nagarjuna</span></h1>
        <h2 className="role">Aspiring Software Engineer</h2>
        <div className="type">{text}</div>
        <p>MCA (Data Science) student with software internship experience at QubicGen. I write clean, efficient code in Java and SQL, build responsive web apps, and solve problems with DSA.</p>
        <div className="btns">
          <a className="btn p" href="#projects">View My Work</a>
          <a className="btn" href="#contact">Contact Me</a>
        </div>
        <div className="stats">
          <div className="stat"><b><Counter to={months} /></b>Months experience</div>
          <div className="stat"><b><Counter to={repos} /></b>GitHub repos</div>
          <div className="stat"><b><Counter to={total} /></b>Projects</div>
        </div>
      </Reveal>
      <Reveal className="pwrap" delay={0.2}><Photo /></Reveal>
    </section>
  );
}
