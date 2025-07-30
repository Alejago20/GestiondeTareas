import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimation,
} from "framer-motion";

const images = [
  { image: "/assets/imagen-1.jpg", alt: "Imagen 1" },
  { image: "/assets/imagen-2.jpg", alt: "Imagen 2" },
  { image: "/assets/imagen-3.jpg", alt: "Imagen 3" },
  { image: "/assets/imagen-4.jpg", alt: "Imagen 4" },
  { image: "/assets/imagen-5.jpg", alt: "Imagen 5" },
  { image: "/assets/imagen-6.jpg", alt: "Imagen 6" },
];

export const FloatingImages = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 10, damping: 30 });
  const y = useSpring(rawY, { stiffness: 10, damping: 30 });
  const offsetX = useTransform(x, (v) => v);
  const offsetY = useTransform(y, (v) => v);

  const radius = 300;
  const fadeDuration = 1.2;
  const pauseDuration = 1.8;

  const items = images.map((item, idx) => {
    const angle = (idx / images.length) * 2 * Math.PI;
    return {
      ...item,
      idx,
      posX: `calc(50% + ${radius * Math.cos(angle)}px)`,
      posY: `calc(50% + ${radius * Math.sin(angle)}px)`,
      initialOpacity: 0.4 + Math.random() * 0.3,
    };
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    rawX.set((e.clientX - (left + width / 2)) / 10);
    rawY.set((e.clientY - (top + height / 2)) / 10);
  };

  useEffect(() => {
    let active = true;

    const animateLoop = async () => {
      while (active) {
        for (let i = 0; i < items.length; i++) {
          const current = items[i];

          await controls.start((custom) => {
            if (custom !== current.idx) return {};
            return {
              top: "50%",
              left: "50%",
              opacity: 1,
              scale: 1.1,
              transition: {
                duration: fadeDuration,
                ease: "easeInOut",
              },
            };
          });

          await new Promise((res) => setTimeout(res, pauseDuration * 1000));

          await controls.start((custom) => {
            if (custom !== current.idx) return {};
            return {
              top: current.posY,
              left: current.posX,
              opacity: current.initialOpacity,
              scale: 1,
              transition: {
                duration: fadeDuration + 0.5,
                ease: "easeInOut",
              },
            };
          });

          await new Promise((res) => setTimeout(res, pauseDuration * 500));
        }
      }
    };

    animateLoop();

    return () => {
      active = false;
    };
  }, [controls]);

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 z-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          x: ["0%", "-1%", "1.5%", "-1.5%", "0%"],
          y: ["0%", "1%", "-0.5%", "1%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {items.map((item) => (
          <motion.img
            key={item.idx}
            custom={item.idx}
            animate={controls}
            initial={{
              top: item.posY,
              left: item.posX,
              opacity: item.initialOpacity,
              zIndex: 1,
            }}
            src={item.image}
            alt={item.alt}
            className="absolute w-40 h-40 object-cover rounded-xl pointer-events-none insent-z"
            style={{
              transform: "translate(-50%, -50%)",
              translateX: offsetX,
              translateY: offsetY,
              filter: "blur(0.5px) saturate(70%) brightness(1.05)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
