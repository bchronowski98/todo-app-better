import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";
import GetWeather from "./components/GetWeather.jsx";
import { ReactComponent as ToggleButton } from "./assets/day-sunny.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState("");
  const outsideClickRef = useRef();

  useEffect(() => {
    const clickOutside = (e) => {
      if (!outsideClickRef.current.contains(e.target)) {
        console.log(outsideClickRef.current);
        console.log(e.target);
        setToggle((prevState) => !prevState);
      }
    };
    if (toggle) {
      console.log(outsideClickRef);
      document.addEventListener("mousedown", clickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [toggle]);

  const addTodo = (todoObject) => {
    setTodos((prevTodos) => [
      { id: nanoid(3), content: todoObject },
      ...prevTodos,
    ]);
  };

  const toggleWeather = (e) => {
    e.preventDefault();
    setToggle((prevState) => !prevState);
    console.log(toggle);
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
  };

  const editTodo = (id, newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          console.log(editId);
          console.log(id);
          return { ...todo, content: newTodo };
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
            <button onClick={toggleWeather}>
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
      <GetWeather
        ref={outsideClickRef}
        toggle={toggle}
        toggleWeather={toggleWeather}
      />
    </div>
  );
}

export default App;
