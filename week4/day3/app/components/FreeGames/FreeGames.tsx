import Link from "next/link";
import { CiGift } from "react-icons/ci";
import GameCard from "../GameCard/GameCard";
export default function FreeGames(){
    return (
        <div className=" bg-[#2A2A2A] rounded-sm py-7">
            <div className="max-w-[980px] mx-auto">
                <div className="flex justify-between">
                <h2 className="flex text-[#F5F5F5] items-center gap-3 text-lg">
                    <CiGift className="w-9 h-9"/>
                    Free Games</h2>
                <Link href={'#'} className="w-[100px] text-[#F5F5F5] h-[32px] border border-[#F5F5F5] inline-flex items-center justify-center">View More</Link>
            </div>
            <div className="w-full flex items-center justify-between py-8">
                <GameCard/>
                <GameCard/>
                <GameCard/>
                <GameCard/>
            </div>
            </div>
        </div>
    )
}