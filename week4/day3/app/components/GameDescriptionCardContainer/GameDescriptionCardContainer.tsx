import GameDescriptionCard from "../GameDescriptionCard/GameDescriptionCard";

export default function GameDescriptionCardContainer(){
    return (
        <div className="flex justify-between mt-16">
            <GameDescriptionCard/>
            <GameDescriptionCard/>
            <GameDescriptionCard/>
        </div>
    )
}