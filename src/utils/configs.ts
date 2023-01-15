import { Configs } from "./types";

const configs: Configs = {
  db: {
    host: "http://127.0.0.1:5984/pokemon",
  },
  pouchDB: {
    revs_limit: 1,
    auto_compaction: true,
    size: 100,
  },
  axios: {
    baseURL: "https://pokeapi.co/api/v2",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  },
};

export default configs;