import { Game } from "@/app/types/game";
import Image from "next/image";
import Link from "next/link";

type GameCardProps = {
    game : Game
}

export default function GameCard({game}:GameCardProps){
      const calculateDiscountedPrice = (price: number, discount?: number | null): string => {
        if(!discount) return price.toFixed(2);
    return (price - (price * discount / 100)).toFixed(2);
  };
    return (
        <Link href={`/games/${game.id}`} className="flex flex-col gap-[10px] cursor-pointer">
            <div className="relative h-[284px] min-w-[200px] rounded-sm overflow-hidden group">
                <Image src={`/images/${game.thumbnail}`} alt="" fill className="object-cover transition-all duration-150 ease-linear group-hover:scale-105"/>
            </div>
            <h3 className="text-[#F5F5F5] text-base">
                {game.title}
            </h3>
            <div className="flex gap-2">
                <div className="sale px-2 rounded-sm text-[#F5F5F5] bg-[#0074E4]">
                    -{game.discount}%
                </div>
                {
                    game?.onSale && <div className="price flex gap-1">
                    <div className="old line-through text-[#F5F5F5]/60 text-base">
                        ₹{game.price}
                    </div>
                    <div className="new text-[#F5F5F5] text-base">
                        ₹{calculateDiscountedPrice(game.price,game?.discount)}
                    </div>
                </div>
                }
            </div>
        </Link>
    )
}