export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  coverImage: string;
  price: number;
  discount?: number;
  onSale: boolean; 
  hasAchievements: boolean;
  description: string;
  genre: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  rating: number; 
  platforms: string[]; 
  screenshots: string[];
  tags: string[];
  requirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
  reviews: {
    user: string;
    comment: string;
    rating: number;
  }[];
}


export interface GameFilters {
  onSale: boolean;
  hasAchievements: boolean;
}

export interface GameApiResponse {
  data: Game[];
}