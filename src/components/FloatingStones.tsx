import { motion } from "framer-motion";

const stones: string[] = [
  "/assets/roca1.png",
  "/assets/roca2.png",
  "/assets/roca3.png",
  "/assets/roca4.png",
  "/assets/roca5.png",
  "/assets/roca6.png",
];

export const FloatingStones: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 h-full w-1/2 flex items-center justify-center pointer-events-none z-10">
      <motion.div
        className="relative w-[300px] h-[300px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {stones.map((src, index) => {
          const angle = (index / stones.length) * 2 * Math.PI;
          const x = Math.cos(angle) * 120;
          const y = Math.sin(angle) * 120;

          return (
            <img
              key={index}
              src={src}
              alt={`stone-${index}`}
              className="absolute w-[60px] h-[60px] object-cover rounded-full"
              style={{
                left: 150 + x,
                top: 150 + y,
                mixBlendMode: "screen",
                filter: "brightness(1.15) contrast(1.2) saturate(1.2)",
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};
