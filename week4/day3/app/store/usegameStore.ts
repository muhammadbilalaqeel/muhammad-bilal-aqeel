import { create } from 'zustand';
import axios from 'axios';
import { Game, GameFilters, GameApiResponse } from '../types/game';

interface GameStore {
  games: Game[];
  singleGame: Game | null;
  loading: boolean;
  error: string | null;
  filters: GameFilters;

  fetchGames: () => Promise<void>;
  fetchGameById: (id: number) => Promise<void>;
 searchGames: (title: string) => Promise<Game[]>;

  setFilters: (newFilters: Partial<GameFilters>) => void;
  getFilteredGames: () => Game[];
  getGamesOnSale: () => Game[];
  getGamesWithAchievements: () => Game[];
  getGamesOnSaleWithAchievements: () => Game[];
}

const useGameStore = create<GameStore>((set, get) => ({
  games: [],
  singleGame: null,
  loading: false,
  error: null,
  filters: {
    onSale: false,
    hasAchievements: false,
  },

  fetchGames: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<GameApiResponse>('/api/games');
      set({ games: response.data.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchGameById: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Game>(`/api/games/${id}`);
      set({ singleGame: response.data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

searchGames: async (title: string): Promise<Game[]> => {
  set({ loading: true, error: null });
  try {
    const response = await axios.get<Game[]>(`/api/games/search?title=${encodeURIComponent(title)}`);
    set({ loading: false });
    return response.data;       
  } catch (error) {
    set({ error: (error as Error).message, loading: false });
    return [];
  }
},

  setFilters: (newFilters: Partial<GameFilters>) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  getFilteredGames: (): Game[] => {
    const { games, filters } = get();
    return games.filter((game) => {
      if (filters.onSale && !game.onSale) return false;
      if (filters.hasAchievements && !game.hasAchievements) return false;
      return true;
    });
  },

  getGamesOnSale: (): Game[] => get().games.filter((game) => game.onSale),
  getGamesWithAchievements: (): Game[] => get().games.filter((game) => game.hasAchievements),
  getGamesOnSaleWithAchievements: (): Game[] =>
    get().games.filter((game) => game.onSale && game.hasAchievements),
}));

export default useGameStore;
