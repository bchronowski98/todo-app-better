import { openDB } from "idb";

export let database = null;
let storedTodos = [];
let checkboxValue = null;

export async function init() {
  const db = await openDB("Test", 1, {
    upgrade(db) {
      const store = db.createObjectStore("Todos", {
        keyPath: "id",
      });
      const checkboxStore = db.createObjectStore("Checkbox", {
        keyPath: "id",
      });
      const cityStore = db.createObjectStore("City", {
        keyPath: "id",
      });
      store.createIndex("date", "timeStamp");
    },
  });

  database = db;
  storedTodos = await db.getAllFromIndex("Todos", "date");
  checkboxValue = await db.get("Checkbox", "1");

  return { storedTodos, checkboxValue };
  // items = await db.getAll("Testowe");
}

export async function deleteTaskIdb(database, id) {
  return await database.delete("Todos", id);
}

export async function updateTaskIdb(
  database,
  id,
  timeStamp,
  content,
  isDone = false
) {
  return await database.put("Todos", {
    id: id,
    timeStamp: timeStamp,
    content: content,
    isDone: isDone,
  });
}

export async function updateCheckbox(database, id, isChecked) {
  return await database.put("Checkbox", { id: id, isChecked: isChecked });
}

export async function updateCity(database, id, city) {
  return await database.put("City", { id: id, city: city });
}
