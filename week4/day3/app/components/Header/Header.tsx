import Image from "next/image";
import Container from "../Container/Container";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { FaUserPlus } from "react-icons/fa6";
export default function Header(){
    return (
        <header className="w-full h-12 bg-[#313131] text-white">
            
                <div className=" max-w-[1440px] mx-auto w-full flex items-center h-full">
                    <div className="w-6 h-7 ml-4 relative">
                        <Image src={'/logo.png'} alt="logo" fill className="object-contain" />
                    </div>
                    <nav className="ml-6 h-full">
                        <ul className="flex items-center h-full font-poppins gap-8">
                            <li className="h-full flex items-center"><Link href={'#'} className="font-poppins text-[12px] font-medium text-[#AAAAAADE]">STORE</Link></li>
                            <li className="h-full flex items-center"><Link href={'#'} className="font-poppins text-[12px] font-medium text-[#AAAAAADE]">FAQ</Link></li>
                            <li className="h-full flex items-center"><Link href={'#'} className="font-poppins text-[12px] font-medium text-[#AAAAAADE]">HELP</Link></li>
                            <li className="h-full flex items-center"><Link href={'#'} className="font-poppins text-[12px] font-medium text-[#AAAAAADE]">UNREAL ENGINE</Link></li>
                        </ul>
                    </nav>
                    <div className="flex ml-auto gap-5 items-center h-full">
                        <TbWorld className="h-5 w-5 text-[#AAAAAA] cursor-pointer"/>
                        <div className="flex items-center gap-2 text-[#AAAAAA] cursor-pointer">
                            <FaUserPlus className="h-5 w-5"/>
                            <span className="text-[12px] font-medium">SIGN IN</span>
                        </div>
                        <button className="cursor-pointer text-[12px] font-medium h-full w-[112px] flex items-center justify-center bg-[#007AFF] text-white">
                            DOWNLOAD
                        </button>
                    </div>
                </div>
        
        </header>
    )
}