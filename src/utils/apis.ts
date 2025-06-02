import axios from "./axios";
import { generateDoc } from "./functions";
import db from "./pouchdb";
import { Pokemon } from "./types";

export const fetchAllPokemon = async (
  limit: number = 10,
  offset: number = 0
) => {
  const res = await axios.get(`/pokemon`, {
    params: {
      limit,
      offset,
    },
  });
  return res.data;
};

export const fetchSinglePokemon = async (name: string) => {
  const res = await axios.get(`/pokemon/${name}`);
  return res.data;
};

export const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 1150) + 1;
  const res = await axios.get(`/pokemon/${randomId}`);
  return res.data;
};

export const capturePokemon = async (pokemon: Pokemon) => {
  const doc = generateDoc(pokemon);
  const res = await db.put(doc).catch((err) => {
    console.log(err);
  });
  return res;
};

export const releasePokemonFromDb = async (pokemon: Pokemon) => {
  if (!pokemon._id || !pokemon._rev) {
    throw new Error('Cannot release pokemon without _id and _rev');
  }
  const res = await db.remove(pokemon._id, pokemon._rev).catch((err) => {
    console.log(err);
  });
  return res;
};

export const getAllCapturedPokemon = async () => {
  const res = await db.allDocs({ include_docs: true });
  return res.rows.map(row => row.doc as Pokemon);
};

export const getSingleCapturedPokemon = async (id: string) => {
  const res = await db.get(id);
  return res;
};