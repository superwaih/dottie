"use client"

import { ToggleTheme } from "./theme-toggle"

const Navbar = () => {
  return (
    <div className="py-4 flex justify-between border-gray-500 px-4 shadow-md h-12 items-center border my-4 w-full  max-w-7xl rounded-md mx-auto">
        <h1 className="font-bold leading-10 dark:text-white text-lg text-dark-400">
            Re<span className="text-green-400">zi</span>se.
        </h1>
        <ToggleTheme />
    </div>
  )
}

export default Navbar