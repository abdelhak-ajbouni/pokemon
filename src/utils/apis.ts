import axios from "./axios";

export const fetchAllPokemon = async (limit: number = 10, offset: number = 0) => {
  const res = await axios.get(`/pokemon`, {
    params: {
      limit,
      offset,
    }
  });
  return res.data;
}

export const fetchSinglePokemon = async (name: string) => {
  const res = await axios.get(`/pokemon/${name}`);
  return res.data;
}

export const fetchRandomPokemon = async () => {
  const randomId = Math.floor(Math.random() * 1154) + 1;
  const res = await axios.get(`/pokemon/${randomId}`);
  return res.data;
}