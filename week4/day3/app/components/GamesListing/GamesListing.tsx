import { Game } from "@/app/types/game";
import ListingComponent from "./ListingComponent/ListingComponent";

type GamesListingProps = {
   games : Game[]
}


export default function GamesListing({games}:GamesListingProps){
    return (
        <div className="pt-10 grid  grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 ">
            <ListingComponent title="Top Sellers" link="https://store.epicgames.com/en-US/collection/top-sellers" games={games} num={1}/>
            {/* <div className="w-1 h-auto border-r"></div> */}
            <ListingComponent title="Best Sellers" link="https://store.epicgames.com/en-US/collection/top-sellers" games={games} num={2}/>
            {/* <div className="w-1 h-auto border-r"></div> */}
            <ListingComponent title="Top Upcoming Games" link="https://store.epicgames.com/en-US/collection/top-sellers" games={games} num={3}/>
        </div>
    )
}