import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  PayloadAction,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as api from "../apis";
import { Pokemon, PokemonState } from "../types";

const initialState: PokemonState = {
  status: "idle",
  randomPokemon: null,
  currentPokemon: null,
  allCapturedPokemon: [],
};

export const getAllPokemon = createAsyncThunk(
  "pokemon/getAllPokemon",
  async (pagination: { limit: number; offset: number }) => {
    const response: any = await api.fetchAllPokemon(
      pagination.limit,
      pagination.offset
    );
    return response.results;
  }
);

export const getSinglePokemon = createAsyncThunk(
  "pokemon/getSinglePokemon",
  async (name: string) => {
    const response: any = await api.fetchSinglePokemon(name);
    return response;
  }
);

export const capturePokemon = createAsyncThunk(
  "pokemon/capturePokemon",
  async (pokemon: Pokemon) => {
    const response = await api.capturePokemon(pokemon);
    return response;
  }
);

export const releasePokemon = createAsyncThunk(
  "pokemon/releasePokemon",
  async (pokemon: Pokemon) => {
    const response = await api.releasePokemonFromDb(pokemon);
    return pokemon;
  }
);

export const getAllCapturedPokemon = createAsyncThunk(
  "pokemon/getAllCapturedPokemon",
  async () => {
    const response = await api.getAllCapturedPokemon();
    return response;
  }
);

export const getSingleCapturedPokemon = createAsyncThunk(
  "pokemon/getSingleCapturedPokemon",
  async (id: string) => {
    const response = await api.getSingleCapturedPokemon(id);
    return response;
  }
);

export const getRandomPokemon = createAsyncThunk(
  "pokemon/getRandomPokemon",
  async () => {
    const response: any = await api.fetchRandomPokemon();
    return response;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    hydrate: (state, action: PayloadAction<PokemonState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSinglePokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentPokemon = action.payload;
      })
      .addCase(getRandomPokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.randomPokemon = action.payload;
      })
      .addCase(capturePokemon.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.allCapturedPokemon = [...state.allCapturedPokemon, action.payload];
        }
      })
      .addCase(releasePokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.allCapturedPokemon = state.allCapturedPokemon.filter(
          pokemon => pokemon._id !== action.payload._id
        );
      })
      .addCase(getAllCapturedPokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.allCapturedPokemon = action.payload;
      })
      .addCase(getSingleCapturedPokemon.fulfilled, (state, action) => {
        state.status = "idle";
        state.capturedPokemon = [];
      })
      .addMatcher(
        isAnyOf(
          getSinglePokemon.pending,
          getRandomPokemon.pending,
          getAllCapturedPokemon.pending,
          getSingleCapturedPokemon.pending,
          capturePokemon.pending,
          releasePokemon.pending
        ),
        (state) => {
          state.status = "loading";
        }
      );
  },
});

export const selectAllCapturedPokemon = (state: RootState) =>
  state.pokemon.allCapturedPokemon;
export const selectRandomPokemon = (state: RootState) =>
  state.pokemon.randomPokemon;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;
export const selectSinglePokemon = (state: RootState) => 
  state.pokemon.currentPokemon;
export const selectMyPokemon = (state: RootState) =>
  state.pokemon.allCapturedPokemon;

export const { hydrate } = pokemonSlice.actions;
export default pokemonSlice.reducer;