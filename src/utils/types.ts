import { AxiosRequestConfig } from "axios";
import PouchDB from "pouchdb";

// App
export interface Configs {
  app: {
    mode: "development" | "test" | "production";
  };
  db: {
    host: string;
  };
  pouchDB: PouchDB.Configuration.DatabaseConfiguration;
  axios: AxiosRequestConfig;
}

// Pokemon
export interface PokemonState {
  status: "idle" | "loading" | "failed";
  randomPokemon: Pokemon | null;
  currentPokemon: Pokemon | null;
  allCapturedPokemon: Pokemon[];
}

export interface Pokemon {
  _id?: string;
  _rev?: string;
  id: string;
  name: string;
  base_experience: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}