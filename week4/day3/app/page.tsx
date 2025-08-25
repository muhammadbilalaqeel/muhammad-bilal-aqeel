"use client"

import Container from "./components/Container/Container";
import Search from "./components/Search/Search";
import TopBanner from "./components/TopBanner/TopBanner";
import GameDescriptionCardContainer from "./components/GameDescriptionCardContainer/GameDescriptionCardContainer";
import FreeGames from "./components/FreeGames/FreeGames";
import GamesListing from "./components/GamesListing/GamesListing";
import GameCardContainer from "./components/GameCardContainer/GameCardContainer";
import Catalog from "./components/Catalog/Catalog";
import useGameStore from "./store/usegameStore";
import { Game } from "./types/game";
import { useEffect } from "react";


export default function Home() {
    const { 
    getGamesOnSale, 
    getGamesOnSaleWithAchievements ,
    fetchGames,
    loading,
    games
  } = useGameStore();
    useEffect(() => {
    fetchGames();
  }, [fetchGames]);
    const gamesOnSale: Game[] = getGamesOnSale();
  const gamesOnSaleWithAchievements : Game[] = getGamesOnSaleWithAchievements();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-[#252525] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="bg-[#121212]">
      <Container>
        <Search/>
        <TopBanner/>
        <GameCardContainer title="Game on sale" game={gamesOnSale} />
        <GameDescriptionCardContainer t={false} games={games} />
        <FreeGames games={games}/>
        <GamesListing games={games}/>
        <GameDescriptionCardContainer t={true} games={games}/>
        <GameCardContainer title="Game with Achievements" game={gamesOnSaleWithAchievements}/>
        <Catalog/>
        
      </Container>
    </div>
  );
}
