// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  extend: {
    keyframes: {
      float1: {
        '0%, 100%': { transform: 'translateY(0px) rotateZ(0deg)' },
        '50%': { transform: 'translateY(-20px) rotateZ(5deg)' },
      },
      float2: {
        '0%, 100%': { transform: 'translateY(0px) rotateZ(0deg)' },
        '50%': { transform: 'translateY(-30px) rotateZ(-5deg)' },
      },
      float3: {
        '0%, 100%': { transform: 'translateY(0px) rotateZ(0deg)' },
        '50%': { transform: 'translateY(-15px) rotateZ(10deg)' },
      },
    },
    animation: {
      float1: 'float1 8s ease-in-out infinite',
      float2: 'float2 12s ease-in-out infinite',
      float3: 'float3 10s ease-in-out infinite',
    },
  },
},

  plugins: [],
};
