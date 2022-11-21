import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";
import GetWeather from "./components/GetWeather.jsx";
import { ReactComponent as ToggleButton } from "./assets/day-sunny.svg";
import { useEffect } from "react";
import {
  init,
  addTaskToDB,
  database,
  deleteTaskFromDB,
  items,
} from "./idb/idb.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState("");
  useEffect(() => {
    init()
      .then(() => {
        console.log("database init");
        setTodos(items);
      })
      .catch(() => console.warn);
  }, []);

  useEffect(() => {
    todos.map((todo) => {
      addTaskToDB(database, todo.id, todo.content, todo.done);
    });
  }, [todos]);

  const addTodo = (todoObject) => {
    const id = nanoid(3);
    setTodos((prevTodos) => [
      { id: id, content: todoObject, done: false },
      ...prevTodos,
    ]);
    // addTaskToDB(database, id, todoObject)
    //   .then(() => {
    //     console.log("added to database", id);
    //   })
    //   .catch(console.warn);
  };

  const toggleWeather = () => {
    setToggle((prevState) => !prevState);
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
    deleteTaskFromDB(database, id)
      .then(() => {
        console.log("task deleted", id);
      })
      .catch(console.warn);
  };

  const editTodo = (id, newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          // addTaskToDB(database, id, newTodo)
          //   .then(() => {
          //     console.log("task edited", id);
          //   })
          //   .catch(console.warn);
          return { ...todo, content: newTodo, done: todo.done };
        }
        return todo;
      })
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div
          className={`${styles.weather} ${toggle ? styles.weatherHidden : ""}`}
        >
          {
            <button type="button" onClick={toggleWeather}>
              <ToggleButton />
            </button>
          }
        </div>
        <FormTodo addTodo={addTodo} />
        <div className={styles.taskSection}>
          <h4 className={styles.title}>Tasks</h4>
          <div className={styles.ulWrapper}>
            <div className={styles.titleRow}>
              <div className={styles.titleText}>
                <h5>Task</h5>
                <h5>Status</h5>
              </div>
            </div>
            <ul className={styles.todolist}>
              {todos.map((todo) => {
                return (
                  <ItemTodo
                    key={todo.id}
                    id={todo.id}
                    content={todo.content}
                    done={todo.done}
                    removeTodo={removeTodo}
                    editTodo={editTodo}
                    setEditId={setEditId}
                    editId={editId}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <GetWeather toggle={toggle} setToggle={setToggle} />
    </div>
  );
}

export default App;
