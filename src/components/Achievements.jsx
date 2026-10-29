import { achievements, profile, fallbackRepos } from "../data";
import { useRepoCount } from "../hooks";
import Reveal from "./Reveal";

export default function Achievements() {
  const repos = useRepoCount(profile.githubUser, fallbackRepos);
  return (
    <section id="ach">
      <h2 className="t">Achievements</h2>
      <div className="ach">
        {achievements.map((a, i) => (
          <Reveal key={a.t} delay={i * 0.12}>
            <div><i>{a.i}</i><h3 style={{ color: "var(--head)", margin: "6px 0" }}>{a.t.replace("{repos}", repos)}</h3>{a.d}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
