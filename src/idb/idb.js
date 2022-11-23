import { openDB } from "idb";

export let database = null;
export let items = [];

export async function init() {
  const db = await openDB("Test", 1, {
    upgrade(db) {
      const store = db.createObjectStore("Testowe", {
        keyPath: "id",
      });
      store.createIndex("date", "timeStamp");
    },
  });

  database = db;
  items = await db.getAllFromIndex("Testowe", "date");
  // items = await db.getAll("Testowe");
}

export async function deleteTaskIdb(database, id) {
  return await database.delete("Testowe", id);
}

export async function updateTaskIdb(
  database,
  id,
  timeStamp,
  content,
  isDone = false
) {
  return await database.put("Testowe", {
    id: id,
    timeStamp: timeStamp,
    content: content,
    isDone: isDone,
  });
}
