import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { fetchAllPokemon, fetchSinglePokemon } from '../apis';

const initialState: PokemonState = {
  allPokemon: [],
  myPokemon: [],
  currentPokemon: null,
  status: 'idle',
};

export const getAllPokemon = createAsyncThunk(
  'pokemon/fetchAllPokemon',
  async (pagination: { limit: number, offset: number }) => {
    const response: any = await fetchAllPokemon(pagination.limit, pagination.offset);
    return response.results;
  }
);

export const getSinglePokemon = createAsyncThunk(
  'pokemon/fetchSinglePokemon',
  async (name: string) => {
    const response: any = await fetchSinglePokemon(name)
    return response;
  }
);

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    capturePokemon: (state, action: PayloadAction<PokemonCaptured>) => {
      const localPokemon = JSON.parse(localStorage.getItem('pokemon') || '[]');
      if (!localPokemon.find((el: Pokemon) => el.name === action.payload.name)) {
        const newLocalPokemon = [...localPokemon, action.payload];
        localStorage.setItem('pokemon', JSON.stringify(newLocalPokemon));
        state.myPokemon = newLocalPokemon;
      }
    },
    releasePokemon: (state, action: PayloadAction<PokemonCaptured>) => {
      const localPokemon = JSON.parse(localStorage.getItem('pokemon') || '[]');
      const newLocalPokemon = localPokemon.filter((el: Pokemon) => el.name !== action.payload.name);
      localStorage.setItem('pokemon', JSON.stringify(newLocalPokemon));
      state.myPokemon = newLocalPokemon;
    },
    loadMyPokemon: (state, action: PayloadAction) => {
      state.myPokemon = JSON.parse(localStorage.getItem('pokemon') || '[]');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPokemon.fulfilled, (state, action) => {
        state.status = 'idle';
        state.allPokemon = action.payload;
      })
      .addCase(getSinglePokemon.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSinglePokemon.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentPokemon = action.payload;
      });
  },
});

export const selectAllPokemon = (state: RootState) => state.pokemon.allPokemon;
export const selectMyPokemon = (state: RootState) => state.pokemon.myPokemon;
export const selectSinglePokemon = (state: RootState) => state.pokemon.currentPokemon;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;

export const { capturePokemon, releasePokemon, loadMyPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;

export interface PokemonState {
  allPokemon: Pokemon[];
  myPokemon: PokemonCaptured[];
  currentPokemon: Pokemon | null;
  status: 'idle' | 'loading' | 'failed';
}
export interface Pokemon {
  name: string;
  base_experience: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
    },
  }[],
  moves: {
    move: {
      name: string;
    }
  }[],
  abilities: {
    ability: {
      name: string;
    }
  }[]
}

export interface PokemonCaptured {
  name: string;
  nickname: string;
}