import React from 'react'

const InfoBox = ({
  text = 'Create vector dotted maps with custom options and download them as SVG or PNG files'
}: {text?: string}) => {
  return (
    <div className='bg-[#18171a] p-6 border-[#333038] rounded-md max-w-[380px] text-[13px] text-[#a3a3a3]'>
        <p>{text}</p>
    </div>
  )
}

export default InfoBox