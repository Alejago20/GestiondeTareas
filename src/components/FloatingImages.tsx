import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useAnimation } from "framer-motion";

const images = [
  { image: "/assets/img1.jpg", alt: "Imagen 1" },
  { image: "/assets/img2.jpg", alt: "Imagen 2" },
  { image: "/assets/img3.png", alt: "Imagen 3" },
  { image: "/assets/img4.png", alt: "Imagen 4" },
  { image: "/assets/img1.jpg", alt: "Imagen 5" },
  { image: "/assets/img2.jpg", alt: "Imagen 6" },
];

const images1 = [
  { image: "/assets/img1.jpg", alt: "Imagen A" },
  { image: "/assets/img2.jpg", alt: "Imagen B" },
  { image: "/assets/img3.png", alt: "Imagen C" },
  { image: "/assets/img4.png", alt: "Imagen D" },
  { image: "/assets/img1.jpg", alt: "Imagen E" },
  { image: "/assets/img2.jpg", alt: "Imagen F" },
];

export const FloatingImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Parallax extra suave
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 10, damping: 30 });
  const y = useSpring(rawY, { stiffness: 10, damping: 30 });
  const offsetX = useTransform(x, value => value);
  const offsetY = useTransform(y, value => value);

  const radius = 290;
  const fadeDuration = 2.5;    // 2.5s para ir al centro y volver
  const pauseDuration = 1.0;   // 1s en el centro antes de regresar
  const total = images.length + images1.length;

  // Pre-cálculo de posiciones y opacidades iniciales
  const items = [
    ...images.map((img, i) => ({ ...img, baseTop: 46, initialOpacity: 0.3, idx: i, z: 0 })),
    ...images1.map((img, i) => ({ ...img, baseTop: 50, initialOpacity: 0.5, idx: i + images.length, z: 1 }))
  ].map(item => {
    const localIdx = item.idx < images.length ? item.idx : item.idx - images.length;
    const group = item.idx < images.length ? images : images1;
    const angle = (localIdx / group.length) * 2 * Math.PI;
    return {
      ...item,
      posX: `calc(50% + ${radius * Math.cos(angle)}px)`,
      posY: `calc(${item.baseTop}% + ${radius * Math.sin(angle)}px)`
    };
  });

  // Captura del ratón para parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (left + width / 2)) / 10);
    rawY.set((e.clientY - (top + height / 2)) / 10);
  };

  // Ciclo automático al montarse
  useEffect(() => {
  let isActive = true;
  (async () => {
    while (isActive) {
      for (let i = 0; i < total; i += 6) {
        const grupos = items.slice(i, i + 6);

        // Fade-out al centro
        await controls.start((customIdx) => {
          if (!grupos.some(g => g.idx === customIdx)) return {};
          return {
            top: "50%",
            left: "50%",
            opacity: 0,
            zIndex: 2,
            transition: { duration: fadeDuration, ease: "easeInOut" }
          };
        });

        await new Promise(res => setTimeout(res, pauseDuration * 1000));

        // Volver a posición original
        await controls.start((customIdx) => {
          if (!grupos.some(g => g.idx === customIdx)) return {};
          const item = items.find(it => it.idx === customIdx)!;
          return {
            top: item.posY,
            left: item.posX,
            opacity: item.initialOpacity,
            zIndex: item.z,
            transition: { duration: fadeDuration, ease: "easeInOut" }
          };
        });
      }
    }
  })();

  return () => { isActive = false; };
}, [controls, items, total, fadeDuration, pauseDuration]);


  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
    >
      <div className="relative w-full h-full">
        {items.map(item => (
          <motion.img
            key={item.idx}
            custom={item.idx}
            animate={controls}
            initial={{
              top:  item.posY,
              left: item.posX,
              opacity: item.initialOpacity,
              zIndex: item.z
            }}
            src={item.image}
            alt={item.alt}
            className="absolute w-28 h-28 object-cover rounded-lg"
            style={{
              transform: "translate(-50%, -50%)",
              translateX: offsetX,
              translateY: offsetY
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};
