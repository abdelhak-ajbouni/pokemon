import { AxiosRequestConfig } from "axios";
import PouchDB from "pouchdb";

// App
export interface Configs {
  db: {
    host: string;
  };
  pouchDB: PouchDB.Configuration.DatabaseConfiguration;
  axios: AxiosRequestConfig;
}

// Pokemon
export interface PokemonState {
  status: "idle" | "loading" | "failed";
  currentPokemon: Pokemon | null;
  capturedPokemon: Pokemon[];
  currentCapturedPokemon: Pokemon | null;
}

export interface Pokemon {
  id:string;
  name: string;
  base_experience: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  // types: {
  //   slot: number;
  //   type: {
  //     name: string;
  //   };
  // }[];
  // moves: {
  //   move: {
  //     name: string;
  //   };
  // }[];
  // abilities: {
  //   ability: {
  //     name: string;
  //   };
  // }[];
}