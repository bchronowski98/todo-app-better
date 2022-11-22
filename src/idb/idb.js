import { openDB } from "idb";

export let database = null;
export let items = [];

export async function init() {
  const db = await openDB("Test", 1, {
    upgrade(db) {
      const store = db.createObjectStore("Testowe", {
        keyPath: "id",
      });
    },
  });

  database = db;
  items = await db.getAll("Testowe");
}

export async function deleteTaskIdb(database, id) {
  return await database.delete("Testowe", id);
}

export async function updateTaskIdb(database, id, content, done = false) {
  return await database.put("Testowe", {
    id: id,
    content: content,
    done: done,
  });
}