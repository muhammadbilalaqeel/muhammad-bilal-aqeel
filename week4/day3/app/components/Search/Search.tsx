import Link from "next/link";
import Container from "../Container/Container";
import { IoSearch } from "react-icons/io5";
export default function Search(){
  return (
   
        <div className="h-[100px] flex items-center gap-5">
           <div className="w-[220px] h-10 bg-[#202020] py-[10px] px-3 flex items-center gap-[10px] rounded-[200px]">
             <IoSearch className="w-[13px] h-[13px] text-[#A0A0A0]" />
             <input type="text" placeholder="Search Store" className="text-[12px] text-[#A0A0A0] placeholder:text-[#A0A0A0]" />
           </div>
           <ul className="flex items-center gap-6">
            <li><Link href={'#'} className="text-[12px] text-white">Discover</Link></li>
            <li><Link href={'#'} className="text-[12px] text-[#666666]">Browse</Link></li>
            <li><Link href={'#'} className="text-[12px] text-[#666666]">News</Link></li>
           </ul>
        </div>
      
  )
}