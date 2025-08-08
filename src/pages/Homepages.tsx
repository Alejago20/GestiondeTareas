import { useGlobalStore } from "../../theme/thema";
import { FloatingImages } from "../components/FloatingImages";
import Header from "../components/Header";
import ToggleTheme from "../components/ToggleTheme";

const Homepages = () => {
  const isthema = useGlobalStore((state) => state.isthema);
  return (
    <div
      className={`relative h-screen w-screen overflow-hidden transition-colors duration-500 
  ${isthema ? "bg-[#f2f2f2] " : "bg-[#0c0c0c]"}`}
    >
      <FloatingImages />
      <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col z-10 items-center px-4 text-center justify-center">
        <h1
          className={`"text-white text-9xl tracking-wider relative inline-block 
  ${isthema ? " text-black" : " text-white"}`}
        >
          COSMODEX
          <span className="absolute text-base top-2 right-[-1.2rem] align-super">
            ©
          </span>
        </h1>

        <p
          className={`"mt-4 text-4xl
  ${isthema ? " text-gray-700 " : " text-gray-300"}`}
        >
          Organiza tu universo de tareas
        </p>
        <div>
          <Header/>
        </div>
      </div>
      <div className="absolute bottom-9 left-7 z-50">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Homepages;
