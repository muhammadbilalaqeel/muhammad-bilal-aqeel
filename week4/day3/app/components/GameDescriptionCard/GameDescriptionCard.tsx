import { Game } from "@/app/types/game";
import Image from "next/image";
import Link from "next/link";

type GameDescriptionCardProps = {
    game : Game
}




export default function GameDescriptionCard({game}:GameDescriptionCardProps){
    // console.log(game)
    return (
        <Link href={`/games/${game.id}`} className="md:max-w-[348px] flex flex-col gap-2 h-[351px] cursor-pointer">
            <div className="relative w-full h-[198px] rounded-[20px] overflow-hidden group">
                <Image src={`/images/${game.thumbnail}`} alt="" fill className="object-cover transition-all duration-150 ease-linear transform group-hover:scale-105"/>
            </div>
            <div className="flex flex-col gap-1.5">
                <h3 className="text-base text-white">{game.title}</h3>
                <p className="text-sm text-white/60 leading-tight">{game.description}</p>

                <h5 className="text-base text-white">₹{game.price}</h5>
            </div>
        </Link>
    )
}