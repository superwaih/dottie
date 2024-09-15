"use client";
import {  ColorInput, Drawer } from "@mantine/core";
import CountrySelector from "./country-selector";
import { useStore } from "@/store/store";
import { Slider } from "@/components/ui/slider";
import {Button} from "@/components/ui/button"
import { handleDownload, handlePNGDownload } from "@/lib/utils";
interface IDrawer {
  opened: boolean;
  close: () => void;
  type: string;
  svgRef: React.RefObject<SVGSVGElement>;
}
const CustomDrawer = ({ opened, close, type, svgRef }: IDrawer) => {
  const bgcolor = useStore((state) => state.backgroundColor);
  const changeBg = useStore((state) => state.changeBackground);
  const color = useStore((state) =>state.color)
  const size = useStore((state) =>state.size)
  const changeSize = useStore((state) =>state.changeSize)

  // const backgroundColor = useStore((state) => state.backgroundColor);


  const changeColor = useStore((state) =>state.changeColor)
  return (
    <Drawer
    
      styles={{
        content: {
          backgroundColor: "#18171a",
          margin: "5px",
          borderRadius: "20px",
          height: "fit-content",
          border: "1px solid #333038",
        },
        header: {
          backgroundColor: "#18171a",
          color: "white",
        },
      }}
      title={type}
      bg={"#18171a"}
      className="bg-[#18171a]"
      position="bottom"
      opened={opened}
      onClose={close}
    >
      {type === "Author" && (
        <div
          className="bg-[#18171a] flex flex-col space-y-4
         border-[#333038] rounded-md  text-[16px] text-[#a3a3a3]"
        >
          <p>
            Create vector dotted maps with custom options and download them as
            SVG or PNG files
          </p>
          <p>
            Design & code by <span className="text-white">Shittu Adewale</span>
          </p>
        </div>
      )}

      {type === "Canvas options" && (
        <div className="flex flex-col space-y-3">
          <div className="flex w-full justify-between gap-3 items-center">
            <p className="text-white text-[13px]">Country</p>
            {/* <DropdownSelect /> */}
            {/* <CountryDropdown /> */}
            <CountrySelector />
          </div>

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

          <div className="flex w-full justify-between items-center">
            <p className="text-white text-[13px] w-full">Padding</p>

            <Slider
              defaultValue={[33]}
              max={100}
              step={1}
              className=" w-full"
            />
          </div>
        </div>
      )}

      {type === "Dot options" && (
        <div className="flex flex-col space-y-4
        ">
          <div className="flex w-full justify-between items-center">
            <p className="text-white text-[13px]">color</p>

            <ColorInput
              variant="unstyled"
              className="w-fit rounded-2xl bg-[#242328]  text-[13px] border-[#333038] border text-white "
              value={color}
              onChange={(e) => {
                changeColor(e);
              }}
            />
          </div>

          <div className='flex justify-between w-full gap-4'>
          <p className='text-white items-center text-[13px] flex gap-4'>size 

            <span className='border border-[#333038] px-3 py-1 rounded-md bg-[#18171a]'>{Number(size) * 10}</span>
          </p>

          <Slider
                defaultValue={[Number(size) * 10]}
                max={25}
                step={1}
                min={1}
                onValueChange={(e) => {
                  const value = e[0]/10
                  changeSize(value.toString())
                }}
                className="w-full"
              />
          </div>
        </div>
      )}

      {
        type === 'Export' && (
          <div className="flex justify-between gap-4">
            <Button
            onClick={() => handleDownload(svgRef)}
            className="bg-[#18171a] flex flex-col space-y-4
         border-[#333038] rounded-md py-4 border hover:text-black w-full text-[16px] text-[#a3a3a3]">
              .SVG
            </Button>
            <Button 
             onClick={() => handlePNGDownload(svgRef, bgcolor)}
            
            
            className="bg-[#18171a] flex flex-col space-y-4
         border-[#333038] rounded-md border w-full py-3 hover:text-black text-[16px] text-[#a3a3a3]">
              .PNG
            </Button>
          </div>
        )
      }
    </Drawer>
  );
};

export default CustomDrawer;
