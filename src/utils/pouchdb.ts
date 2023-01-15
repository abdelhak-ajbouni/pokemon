import PouchDB from "pouchdb";
import configs from "src/utils/configs";

const db = new PouchDB(configs.db.host, configs.pouchDB);

db.info().then((info) => {
  console.log("PouchDB is connected!");
  console.log(info);
}).catch((err) => {
  console.log("PouchDB is not connected!");
  console.error(err);
});

export default db;
