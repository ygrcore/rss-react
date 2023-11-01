export interface PokemonData {
  name: string;
  image?: string;
  type?: string;
  id?: string;
}

export interface PokemonResult {
  name: string;
  url: string;
}

export interface PokemonResponse {
  name: string;
  sprites: {
    front_default: string;
    // add more
  };
  types?: {
    type: {
      name: string;
      // url?: string;
    }
  }[];
  id?: string;
}

export interface PokemonResource {
  count?: number;
  next?: string;
  previous?: string;
  results: PokemonResult | PokemonResult[];
}