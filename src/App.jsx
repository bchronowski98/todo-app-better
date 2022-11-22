import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";
import WeatherWidget from "./components/WeatherWidget.jsx";
import { ReactComponent as ToggleButton } from "./assets/day-sunny.svg";
import {
  init,
  updateTaskIdb,
  deleteTaskIdb,
  database,
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
      updateTaskIdb(database, todo.id, todo.content, todo.done);
    });
  }, [todos]);

  const addTodo = (todoObject) => {
    setTodos((prevTodos) => [
      { id: nanoid(3), content: todoObject, done: false },
      ...prevTodos,
    ]);
  };

  const toggleWeather = () => {
    setToggle((prevState) => !prevState);
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
    deleteTaskIdb(database, id)
      .then(() => {
        console.log("task deleted", id);
      })
      .catch(console.warn);
  };

  const editTodo = (id, newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, content: newTodo };
        }
        return todo;
      })
    );
  };

  const changeDone = (id, done) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, done: done };
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
                    changeDone={changeDone}
                    setEditId={setEditId}
                    editId={editId}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <WeatherWidget toggle={toggle} setToggle={setToggle} />
    </div>
  );
}

export default App;
