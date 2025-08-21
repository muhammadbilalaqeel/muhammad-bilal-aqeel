import { Game } from "@/app/types/game"
import Image from "next/image"
import Link from "next/link"

type ListingComponentProps ={
    title : string
    link:string
    games: Game[]
    num : number
}


export default function ListingComponent({title,link,games,num}:ListingComponentProps){
    return(
        <div className=" h-[516px] justify-between">
             <div className="flex w-full text-[#F5F5F5] justify-between">
                <h2 className="text-[22px]">{title}</h2>
                <Link href={link} className="inline-flex justify-center items-center rounded-[5px] border border-[#F5F5F5] w-[100px] h-[32px]">View More</Link>
             </div>
             <div className="flex flex-col gap-3 mt-5">
                {
                    num === 1 ? games?.slice(0,5).map((game,item)=>{
                        return <Link href={`/games/${game.id}`} className="cursor-pointer flex items-center gap-[10px]" key={item}>
                    <div className="h-20 w-[60px] relative rounded-sm overflow-hidden">
                        <Image src={`/images/${game.thumbnail}`} alt="" fill className="object-cover"/>
                    </div>
                    <div>
                        <h4 className="text-sm text-[#F5F5F5]">{game.title}</h4>
                        <p className="text-[12px] text-white">₹{game.price}</p>
                    </div>
                </Link>
                    }) : num === 2 ? games?.slice(6,11).map((game,item)=>{
                        return <Link href={`/games/${game.id}`} className="cursor-pointer flex items-center gap-[10px]" key={item}>
                    <div className="h-20 w-[60px] relative rounded-sm overflow-hidden">
                        <Image src={`/images/${game.thumbnail}`} alt="" fill className="object-cover"/>
                    </div>
                    <div>
                        <h4 className="text-sm text-[#F5F5F5]">{game.title}</h4>
                        <p className="text-[12px] text-white">₹{game.price}</p>
                    </div>
                </Link>
                    }) :  games?.slice(4,9).map((game,item)=>{
                        return <Link href={`/games/${game.id}`} className="cursor-pointer  flex items-center gap-[10px]" key={item}>
                    <div className="h-20 w-[60px] relative rounded-sm overflow-hidden">
                        <Image src={`/images/${game.thumbnail}`} alt="" fill className="object-cover"/>
                    </div>
                    <div>
                        <h4 className="text-sm text-[#F5F5F5]">{game.title}</h4>
                        <p className="text-[12px] text-white">₹{game.price}</p>
                    </div>
                </Link>
                    })
                }
             
             </div>
        </div>
    )
}