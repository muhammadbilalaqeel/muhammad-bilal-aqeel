"use client";

import Image from "next/image";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-12 bg-[#313131] text-white fixed top-0 left-0 z-50">
      <div className="max-w-[1440px] mx-auto w-full flex items-center h-full md:px-0 md:pl-4 px-4 ">
        {/* Logo */}
        <div className="relative w-6 h-7">
          <Image src={"/logo.png"} alt="logo" fill className="object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav className="ml-6 hidden md:block">
          <ul className="flex items-center h-full font-poppins gap-8">
            <li className="b">
              <Link
                href="/"
                className="text-[12px] font-medium text-[#AAAAAADE] hover:text-white"
              >
                STORE
              </Link>
            </li>
            <li className="b">
              <Link
                href="https://www.crazygames.com"
                className="text-[12px] font-medium text-[#AAAAAADE] hover:text-white"
              >
                FAQ
              </Link>
            </li>
            <li className="b">
              <Link
                href="https://playhop.com"
                className="text-[12px] font-medium text-[#AAAAAADE] hover:text-white"
              >
                HELP
              </Link>
            </li>
            <li className="b">
              <Link
                href="https://www.unrealengine.com/"
                className="text-[12px] font-medium text-[#AAAAAADE] hover:text-white"
              >
                UNREAL ENGINE
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right Section */}
        <div className="flex ml-auto gap-5 items-center h-full">
          <Link href={'https://www.unrealengine.com/'}>
           <TbWorld className="h-5 w-5 text-[#AAAAAA] cursor-pointer hidden sm:block" />
          </Link>
          <Link href={'https://accounts.google.com/servicelogin?hl=en-gb'} className="hidden sm:flex items-center gap-2 text-[#AAAAAA] cursor-pointer">
            <FaUserPlus className="h-5 w-5" />
            <span className="text-[12px] font-medium">SIGN IN</span>
          </Link>
          <button className="cursor-pointer text-[12px] font-medium h-full w-[100px] sm:w-[112px] flex items-center justify-center bg-[#007AFF] text-white">
            DOWNLOAD
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#222] px-6 py-4">
          <ul className="flex flex-col gap-4 font-poppins">
            <li>
              <Link href="/" className="text-sm text-[#AAAAAADE] hover:text-white">
                STORE
              </Link>
            </li>
            <li>
              <Link href="https://www.unrealengine.com/" className="text-sm text-[#AAAAAADE] hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="https://www.unrealengine.com/" className="text-sm text-[#AAAAAADE] hover:text-white">
                HELP
              </Link>
            </li>
            <li>
              <Link href="https://www.unrealengine.com/" className="text-sm text-[#AAAAAADE] hover:text-white">
                UNREAL ENGINE
              </Link>
            </li>
               <li className="flex items-center gap-2 text-[#AAAAAA] cursor-pointer sm:hidden">
                <Link href={'https://www.unrealengine.com/'}><TbWorld className="h-5 w-5" /></Link></li>
            <li className="flex items-center gap-2 text-[#AAAAAA] cursor-pointer sm:hidden">
              <Link href={'https://accounts.google.com/servicelogin?hl=en-gb'} className="flex items-center gap-2"><FaUserPlus className="h-5 w-5" />
              <span className="text-[12px] font-medium">SIGN IN</span></Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
