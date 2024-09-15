import { ResetIcon } from "@radix-ui/react-icons";
import React from "react";
import Logo from "./logo";
import { DotFilledMapProps } from "./canvas";
import { useStore } from "@/store/store";
import { handleDownload, handlePNGDownload } from "@/lib/utils";

const Header = ({ svgRef }: DotFilledMapProps) => {
  const backgroundColor = useStore((state) => state.backgroundColor);

  return (
    <div className=" px-4 mx-auto w-[99%] py-4 border border-[#333038] rounded-md bg-[#18171a] my-2  ">
      <div className="flex justify-between items-center">
        <h1 className="text-white flex gap-2 items-center  font-semibold">
          <Logo />

          <span className="leading-10 font-bold text-md sm:text-lg tracking-tight">
            DOTTIE
          </span>
        </h1>
        <div className="hidden gap-4 items-center sm:flex">
          <p className="text-[#a3a3a3] text-sm">EXPORT:</p>

          <div className="flex gap-4 text-white text-[15px] items-center">
            <button onClick={() => handleDownload(svgRef)}>.SVG</button>
            <button
             onClick={() => handlePNGDownload(svgRef, backgroundColor)}
                
                >
              .PNG
            </button>
          </div>
        </div>

        <div className="flex gap-4 text-[15px]  text-white items-center">
          <button className="hidden sm:block ">Fullscreen</button>
          <button className="">
            <p className="hidden sm:block ">Reset</p>
            <ResetIcon className="sm:hidden block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
