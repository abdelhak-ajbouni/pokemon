import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer, {
  PokemonState,
  capturePokemon,
  releasePokemon,
  loadMyPokemon,
  getAllPokemon,
  getSinglePokemon
} from 'src/utils/slices/pokemon';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

describe('pokemon reducer', () => {
  const initialState: PokemonState = {
    allPokemon: [],
    myPokemon: [],
    currentPokemon: null,
    status: 'idle',
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('pokemon', '[{"name": "bulbasaur", "nickname": "bulb"}]');
  })

  it('should return the initial state', () => {
    expect(pokemonReducer(undefined, { type: 'unknown' })).to.eql({
      allPokemon: [],
      myPokemon: [],
      currentPokemon: null,
      status: 'idle',
    })
  })

  it('should handle capturePokemon', () => {
    const res = pokemonReducer(initialState, capturePokemon({ name: 'pikachu', nickname: 'pika' }));
    expect(res.myPokemon).to.eql([
      { name: 'bulbasaur', nickname: 'bulb' },
      { name: 'pikachu', nickname: 'pika' }
    ]);
  });

  it('should handle releasePokemon', () => {
    const res = pokemonReducer(initialState, releasePokemon({ name: 'bulbasaur', nickname: 'bulb' }));
    expect(res.myPokemon).to.eql([]);
  });

  it('should handle loadMyPokemon', () => {
    const res = pokemonReducer(initialState, loadMyPokemon());
    expect(res.myPokemon).to.eql([{ name: 'bulbasaur', nickname: 'bulb' }]);
  })

  it('should get one Pokemon', async () => {
    const res = await store.dispatch(getAllPokemon({ limit: 1, offset: 0 }))
    expect(res.payload).to.eql([{
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/'
    }]);
  })

  it('should get one Pokemon by name', async () => {
    const res = await store.dispatch(getSinglePokemon('bulbasaur'));
    expect(res.payload).to.have.property('name', 'bulbasaur');
  })
});
