import { Game } from "@/app/types/game";
import GameDescriptionCard from "../GameDescriptionCard/GameDescriptionCard";

type GameDescriptionCardContainerProps = {
    games : Game[]
    t : boolean
}

export default function GameDescriptionCardContainer({games,t}:GameDescriptionCardContainerProps){
    
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 justify-between mt-16 gap-4">

            {
               !t ?  games?.slice(8,11).map((game,i)=>{
                    return   <GameDescriptionCard game={game} key={i}/>
                }) :  games?.slice(0,3).map((game,i)=>{
                    return   <GameDescriptionCard game={game} key={i}/>
                })
            }
        </div>
    )
}