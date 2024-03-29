import PouchDB from "pouchdb";
import configs from "src/utils/configs";

// TODO: fix graceful shutdown
const db = new PouchDB(configs.db.host);
const isDevelopment = configs.app.mode === "development";

if (isDevelopment) {
  db.changes({
    since: "now",
    live: true,
  }).on("change", (change) => {
    console.log("PouchDB change", change);
  });
}

export const checkDB = async () => {
  const info = await db.info().catch((err) => {
    console.log("PouchDB is not connected!", err);
  });

  if (!info) {
    await closeDB();
  }

  console.log("PouchDB is connected!");
  isDevelopment && console.log(info);
};

export const closeDB = async () => {
  await db.close();
  console.log("PouchDB is closed!");
  process.exit(0);
};

export const destroyDB = async () => {
  await db.destroy();
  console.log("PouchDB is destroyed!");
};

checkDB();
export default db;
