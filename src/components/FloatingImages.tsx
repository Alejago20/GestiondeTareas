const images = [
  { image: "/assets/img1.jpg", alt: "Imagen 1" },
  { image: "/assets/img2.jpg", alt: "Imagen 2" },
  { image: "/assets/img3.png", alt: "Imagen 3" },
  { image: "/assets/img4.png", alt: "Imagen 4" },
 { image: "/assets/img1.jpg", alt: "Imagen 1" },
  { image: "/assets/img2.jpg", alt: "Imagen 2" },
];

export const FloatingImages = () => {
  const radius = 290; // Radio del círculo

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="relative w-full h-full">
        {images.map((img, index) => {
          const angle = (index / images.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <img
              key={index}
              src={img.image}
              alt={img.alt}
              className={`absolute w-28 h-28 object-cover rounded-lg opacity-35 shadow-md animate-float${(index % 4) + 1}`}
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
                transform: "translate(-50%, -50%)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
