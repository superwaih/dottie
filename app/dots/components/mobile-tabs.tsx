"use client";
import { useDisclosure } from "@mantine/hooks";
import { AreaChartIcon, ExpandIcon, Grid2X2, InfoIcon } from "lucide-react";
import CustomDrawer from "./drawers";
import { useState } from "react";
import { DotFilledMapProps } from "./canvas";

const MobileTabs = ({ svgRef }: DotFilledMapProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [currentType, setCurrentType] = useState("author");
  return (
    <>
      <div className="p-2 grid grid-cols-4 mx-auto w-[99%] border border-[#333038] rounded-md bg-[#18171a]  gap-3">
        <button
          onClick={() => {
            open();
            setCurrentType("Author");
          }}
          className="flex justify-center items-center bg-[#333038] rounded-md p-2 h-full w-full "
        >
          <InfoIcon className="text-white size-6" />
        </button>

        <button
          onClick={() => {
            open();
            setCurrentType("Canvas options");
          }}
          className="flex justify-center items-center bg-[#333038] rounded-md p-2 h-full w-full "
        >
          {/* <InfoIcon  /> */}
          <AreaChartIcon className="text-white size-6" />
        </button>

        <button
          onClick={() => {
            open();
            setCurrentType("Dot options");
          }}
          className="flex justify-center items-center bg-[#333038] rounded-md p-2 h-full w-full "
        >
          <Grid2X2 className="text-white size-6" />
        </button>

        <button
          onClick={() => {
            open();
            setCurrentType("Export");
          }}
          className="flex justify-center items-center bg-[#333038] rounded-md p-2 h-full w-full "
        >
          <ExpandIcon className="text-white size-6" />
        </button>
      </div>
      <div className="md:hidden block">
        {opened && (
          <CustomDrawer
            svgRef={svgRef}
            type={currentType}
            opened={opened}
            close={close}
          />
        )}
      </div>
    </>
  );
};

export default MobileTabs;
