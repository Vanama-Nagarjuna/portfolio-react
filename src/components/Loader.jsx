// Internet slow ga unnappudu kanipinche loading screen (rat running on clouds)
export default function Loader() {
  return (
    <div className="boot now">
      <div className="sky">
        <span className="cl c1">☁️</span><span className="cl c2">☁️</span><span className="cl c3">☁️</span>
        <div className="ground">{"☁️".repeat(20)}</div>
        <div className="rat">🐀</div>
      </div>
      <p>Loading portfolio<span className="dots" /></p>
    </div>
  );
}
