import React, { ReactNode } from 'react'

const DialogBox = ({ children, header, className }: {children: ReactNode, header: string, className?: string;}) => {
    return (
        <div className={`border border-[#333038] rounded-md bg-[#18171a] `}>
            <div className='bg-[#242328] py-2 text-center text-white text-[13px]'>
                <p>{header}</p>
            </div>
            <div className='w-full bg-white h-[0.1px]' />


            <div className= { 
                `py-4 text-white bg-[#18171a] px-3 ${className}`
            }>
                {children}
            </div>
            <div className='bg-[#242328] py-3'>
            </div>
        </div>
    )
}

export default DialogBox