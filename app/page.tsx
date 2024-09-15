"use client";
import React, { useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { useStore } from "@/store/store";
import { ColorInput } from "@mantine/core";
import Header from "./dots/components/header";
import DotFilledMap from "./dots/components/canvas";
import CountrySelector from "./dots/components/country-selector";
import InfoBox from "./dots/components/info-box";
import LeftSidebar from "./dots/components/left-sidebar";
import MobileTabs from "./dots/components/mobile-tabs";
import Seperator from "./dots/components/seperator";
import DialogBox from "./dots/shared/dialog-box";

const WorldDots = () => {
  const bgcolor = useStore((state) => state.backgroundColor);
  const changeBg = useStore((state) => state.changeBackground);
  const padding = useStore((state) => state.padding);
  const changePadding = useStore((state) => state.changePadding);
  const svgRef = useRef(null)
  return (
    <div className="bg-black min-h-screen h-screen flex flex-col">
      <Header svgRef={svgRef} />
      <main className="flex-grow mx-auto w-[98%] sm:w-[99%] grid grid-cols-5 gap-3">
        <aside className="hidden sm:flex col-span-1 flex-col gap-2">
          <InfoBox />

          <DialogBox header={"Region"}>
            <div className="flex w-full justify-between gap-3 items-center">
              <p className="text-white text-[13px]">Country</p>
              <CountrySelector />
            </div>
          </DialogBox>
          <DialogBox
            className="flex flex-col space-y-5"
            header={"Canvas options"}
          >
            <div className="flex w-full justify-between  items-center">
              <p className="text-white text-[13px]">Background</p>

              <ColorInput
                style={{
                  background: "",
                }}
                className="w-fit !rounded-2xl !bg-[#242328]  !text-[13px] !border-[#333038] !border !text-white "
                variant="unstyled"
                value={bgcolor}
                onChange={(e) => {
                  changeBg(e);
                }}
              />
            </div>
            <Seperator />

            <div className="flex w-full justify-between gap-4 items-center">
              <p className="text-white items-center text-[13px] flex gap-4">
                Padding
                <span className="border border-[#333038] px-3 py-1 rounded-md bg-[#18171a]">
                  {Number(padding)}
                </span>
              </p>

              <Slider
                defaultValue={[Number(padding)]}
                max={5}
                step={1}
                onValueChange={(e) => {
                  const value = e[0];
                  changePadding(value.toString());
                }}
                className="w-full"
              />
            </div>
          </DialogBox>
        </aside>

        <section className="col-span-5 sm:col-span-3">
          <DotFilledMap  svgRef={svgRef}/>
        </section>

        <aside className="col-span-1">
          <LeftSidebar />
        </aside>
      </main>

      <div className="sm:hidden inline-block fixed bottom-0 left-0 right-0 z-[100]">
        <MobileTabs svgRef={svgRef} />
      </div>
    </div>
  );
};

export default WorldDots;
