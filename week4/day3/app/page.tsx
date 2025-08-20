import Image from "next/image";
import Container from "./components/Container/Container";
import Search from "./components/Search/Search";
import TopBanner from "./components/TopBanner/TopBanner";
import GameOnSale from './components/GameOnSale/GameOnSale';
import GameDescriptionCardContainer from "./components/GameDescriptionCardContainer/GameDescriptionCardContainer";
import FreeGames from "./components/FreeGames/FreeGames";
import GamesListing from "./components/GamesListing/GamesListing";

export default function Home() {
  return (
    <div className="bg-black">
      <Container>
        <Search/>
        <TopBanner/>
        <GameOnSale/>
        <GameDescriptionCardContainer/>
        <FreeGames/>
        <GamesListing/>
      </Container>
    </div>
  );
}
