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