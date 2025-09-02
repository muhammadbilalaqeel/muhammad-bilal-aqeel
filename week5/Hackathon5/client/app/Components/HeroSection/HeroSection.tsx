"use client"

import Image from "next/image";
import Container from "../Common/Container";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function HeroSection(){
    return (
        <div className="w-full h-[685px] relative bg-hero">
            <div className="bg-[#1A1A1A]/70 absolute z-10 w-full h-full"></div>
            <Container className="relative z-10 h-full">
                <div className="flex items-center h-full">
                    <div className="w-[488px]  flex flex-col justify-between gap-[20px]">
                        <div className="bg-[#BBD0F6] p-[13px] rounded-[5px] text-[#2E3D83] font-bold text-base w-[210px]">WELCOME TO AUCTION</div>

                        <h1 className="font-josefin text-[74px] text-white leading-[100%]">Find Your Dream Car</h1>

                        <p className="font-medium text-base text-[#C0C0C0] leading-[100%]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus elementum cursus tincidunt sagittis elementum suspendisse
                             velit arcu.  
                        </p>
                    </div>
<div className="absolute bottom-[50px] flex justify-center">
    
                    {/* <div className="max-w-[957px]  w-full h-[80px] shadow-[3px_3px_4px_0px_#56565640] rounded-[5px] bg-white p-2.5 gap-3 flex items-center justify-between">
                      <div className="flex flex-col px-2 w-full h-full justify-between">
                         <p className="text-sm text-[#9A9A9A] font-medium">Make</p>
                         <form className="flex gap-10 w-full ">
                            <select className="flex-1 shadow-[3px_2px_0px_0px_#CACACA40] flex items-center gap-5 px-[10px] py-[5px] text-[#9A9A9A]">
                                Audi 
                                <option value="">Example</option>
<option value="">Example</option>
<option value="">Example</option>
                            </select>

                            <select className="flex-1 shadow-[3px_2px_0px_0px_#CACACA40] flex items-center gap-5 px-[10px] py-[5px] text-[#9A9A9A]">
                                Model
                                <option value="">Example</option>
<option value="">Example</option>
<option value="">Example</option>
                            </select>

                            <select className="flex-1 shadow-[3px_2px_0px_0px_#CACACA40] flex items-center gap-5 px-[10px] py-[5px] text-[#9A9A9A]">
                                Year
                                <option value="">Example</option>
<option value="">Example</option>
<option value="">Example</option>
                            </select>

                            <select className="flex-1 shadow-[3px_2px_0px_0px_#CACACA40] flex items-center gap-5 px-[10px] py-[5px] text-[#9A9A9A]">
                                Price
                                <option value="">Example</option>
<option value="">Example</option>
<option value="">Example</option>
                            </select>
                         </form>
                      </div>
                      <div className="w-[353px] bg-[#2E3D83] rounded-[5px] h-full px-5 flex items-center gap-3">
                        <FaMagnifyingGlass className="h-6 w-6 text-white"/>
                        <input type="text" placeholder="Search" className="text-xl font-medium text-white placeholder:text-white outline-none" />
                      </div>
                </div> */}
</div>
                </div>

                
            </Container>
        </div>
    )
}