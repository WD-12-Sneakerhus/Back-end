import { useState, useEffect } from "react";

const images = [
  "/img/banner1.png",
  "/img/banner2.png",
  "/img/banner3.png",
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
        />
      ))}
    </div>
  );
};

export default HeroSection;
