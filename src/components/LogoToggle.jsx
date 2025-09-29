import { useState } from "react";

const LogoToggle = () => {
  const [isSvg, setIsSvg] = useState(true);

  return (
    <img
      src={isSvg ? "/icon.png" : "/icon-glow.png"}
      alt="ProductivIO Logo"
      whileHover={{ scale: 1.2, rotate: 10 }}
      onMouseEnter={() => setIsSvg(false)}
      onMouseLeave={() => setIsSvg(true)}
      className="mx-auto mb-4 w-20 h-20 object-contain cursor-pointer transition-transform duration-200 hover:scale-105"
    />
  );
};

export default LogoToggle;
