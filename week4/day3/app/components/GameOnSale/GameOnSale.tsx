import { IoIosArrowForward } from "react-icons/io";
import GameCard from "../GameCard/GameCard";

export default function GameOnSale(){
    return (
        <div className="py-8">
            <div className="flex justify-between">
                <h2 className="text-lg text-[#F5F5F5] flex items-center gap-2">Game on sale <IoIosArrowForward className="w-2 h-2"/></h2>
                <div className="flex items-center gap-2">
                   <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#202020] text-[#F5F5F5]/50 cursor-pointer"><IoIosArrowForward className="transform rotate-[180deg]"/></div>
                   <div className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#202020] text-[#F5F5F5] cursor-pointer"><IoIosArrowForward className=""/></div>
                </div>
            </div>
            <div className="flex items-center mt-10 justify-between">
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
            </div>
        </div>
    )
}