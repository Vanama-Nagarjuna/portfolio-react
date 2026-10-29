const links = ["Home", "About", "Experience", "Skills", "Projects", "Contact"];

export default function Navbar({ active, light, onToggle }) {
  return (
    <nav>
      <a href="#home" className="logo">Nagarjuna<b>.</b></a>
      <ul id="menu">
        {links.map((l) => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className={active === l.toLowerCase() ? "on" : ""}>{l}</a>
          </li>
        ))}
        <li><button id="theme" onClick={onToggle} title={light ? "Dark mode" : "Light mode"}>◐</button></li>
      </ul>
    </nav>
  );
}
