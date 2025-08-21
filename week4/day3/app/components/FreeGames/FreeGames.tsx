import Link from "next/link";
import { CiGift } from "react-icons/ci";
import GameCard from "../GameCard/GameCard";
import { Game } from "@/app/types/game";

type FreeGameProps = {
    games : Game[]
}

export default function FreeGames({games}:FreeGameProps){
    return (
        <div className=" bg-[#2A2A2A] rounded-sm py-7 px-3">
            <div className="max-w-[980px] mx-auto">
                <div className="flex justify-between">
                <h2 className="flex text-[#F5F5F5] items-center gap-3 text-lg">
                    <CiGift className="w-9 h-9"/>
                    Free Games</h2>
                <Link href={'#'} className="w-[100px] text-[#F5F5F5] h-[32px] border border-[#F5F5F5] inline-flex items-center justify-center">View More</Link>
            </div>
            <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] py-8 flex-wrap  gap-3">
                {
                    games?.slice(4,8).map((game,i)=>{
                        return <GameCard game={game} key={i} />

                    })
                }
            </div>
            </div>
        </div>
    )
}