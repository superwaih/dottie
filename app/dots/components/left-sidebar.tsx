import React from 'react'
import InfoBox from './info-box'
import DialogBox from '../shared/dialog-box'
import { ColorInput } from '@mantine/core'
import { useStore } from '@/store/store'
import { Slider } from '@/components/ui/slider'
import Seperator from './seperator'

const LeftSidebar = () => {
  const color = useStore((state) =>state.color)
  const size = useStore((state) =>state.size)


const changeColor = useStore((state) =>state.changeColor)
const changeSize = useStore((state) =>state.changeSize)

  return (
    <div className='w-full hidden space-y-4 sm:flex text-white flex-col gap-2 '>
      <DialogBox header={'Canvas options'}>
     <div className='flex flex-col space-y-4'>
     <div className='flex w-full justify-between  items-center'>
            <p className='text-white text-[13px]'>color</p>

            <ColorInput 
            variant='unstyled'
            className='w-fit rounded-2xl bg-[#242328]  text-[13px] border-[#333038] border text-white '
            value={color} onChange={(e) =>{
              changeColor(e)
            }} />
          </div>
<Seperator />
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
          </DialogBox>
      <InfoBox text='Last update August 2024, v1.0.0' />

      </div>
  )
}

export default LeftSidebar