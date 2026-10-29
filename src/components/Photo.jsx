import { useRef, useState } from "react";
import { useOwner } from "../hooks";

// Photo order: 1) browser lo upload chesinadi  2) public/photo.jpg  3) "VN" initials
export default function Photo() {
  const { owner: canEdit } = useOwner();
  const ref = useRef(null);
  const [saved, setSaved] = useState(() => {
    try { return localStorage.getItem("myPhoto") || ""; } catch { return ""; }
  });
  const [broken, setBroken] = useState(false);
  const url = saved || (broken ? "" : "/photo.jpg");

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  };

  const pick = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const k = Math.min(1, 700 / Math.max(img.width, img.height));
        const c = document.createElement("canvas");
        c.width = img.width * k; c.height = img.height * k;
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        const data = c.toDataURL("image/jpeg", 0.88);
        setSaved(data);
        try { localStorage.setItem("myPhoto", data); } catch { /* ignore */ }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="pframe" ref={ref} onMouseMove={move} onMouseLeave={() => (ref.current.style.transform = "")}>
      <div className="pimg">
        {url ? <img src={url} alt="Vanamala Nagarjuna" onError={() => !saved && setBroken(true)} /> : <span>VN</span>}
      </div>
      {canEdit && (
        <label className="pcam" title="Upload photo">
          📷
          <input type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files[0])} />
        </label>
      )}
    </div>
  );
}
