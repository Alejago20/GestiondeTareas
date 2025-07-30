import { useEffect, useRef } from "react";
import { animate } from "animejs";

const images = [
  "/assets/img1.png",
  "/assets/img2.png",
  "/assets/img3.png",
  "/assets/img4.png",
];

// Función random que reemplaza anime.random
function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function FloatingImages() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll(".float-img");
    if (!elements) return;

    elements.forEach((el) => {
      animate(el, {
        translateX: random(-20, 30),
        translateY: random(-20, 20),
        rotate: random(-10, 10),
        duration: random(2000, 3000),
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
      });
    });
  }, []);

  return (
    <div ref={containerRef}>
      {images.map((src, i) => {
        const top = random(0, 50) + "vh";
        const left = random(0, 40) + "vw";
        const size = random(40, 80);

        return (
          <img
            key={i}
            src={src}
            alt=""
            className="float-img absolute pointer-events-none opacity-20 blur-sm"
            style={{
              top,
              left,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      })}
    </div>
  );
}