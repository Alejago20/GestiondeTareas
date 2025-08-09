import { useGlobalStore } from '../../theme/thema';
const ToggleTheme = () => {
    const openThema = useGlobalStore((state) => state.openThema);
     const isthema = useGlobalStore((state) => state.isthema);
  return (
    <div
      onClick={() => openThema()}
      className={`flex items-center gap-4 px-6 py-2 rounded-2xl cursor-pointer select-none 
        ${isthema 
          ? "bg-[#f2f2f2] border border-black/20 " 
          : " bg-[#0c0c0c] border  border-white/20 hover:border-white"
        }`}
    >
      <div  className={`px-1.9 py-1 
          ${isthema ? "bg-transparent text-gray-400 hover:text-black " : "text-white"}`
          }>Dark</div>
      <div className={`px-1 py-1
          ${!isthema ? "bg-transparent text-gray-400 hover:text-white" : " text-black"}
        `} >Light</div>
    </div>
  );
};

export default ToggleTheme;
/* 
import { useGlobalStore } from '../../theme/thema';

const ToggleTheme = () => {
  const openThema = useGlobalStore((s) => s.openThema);
  const isthema = useGlobalStore((s) => s.isthema);

  return (
    <div
      onClick={openThema}
      role="button"
      tabIndex={0}
      className={`flex items-center gap-4 px-6 py-2 rounded-2xl cursor-pointer select-none transition-colors duration-200
        ${isthema 
          ? "bg-[#f2f2f2] border border-black/20 text-black" 
          : "bg-[#0c0c0c]/40 border border-white/20 text-white"
        }`}
    >
      <div className={`
        ${isthema ? "bg-transparent text-gray-400 " : "text-black"}`}>
        Dark
      </div>

      <div className={`
        ${isthema ? " text-black" : "bg-transparent text-gray-400"}`}>
        Light
      </div>
    </div>
  );
};

export default ToggleTheme; */
