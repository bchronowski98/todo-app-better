import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";
import GetWeather from "./components/GetWeather.jsx";
import ToggleButton from "./assets/day-sunny.svg";

function App() {
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(false);

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
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h4>TASKS</h4>
          {!toggle && (
            <button onClick={toggleWeather}>
              <img src={ToggleButton} alt="toggle-button" />
            </button>
          )}
        </div>
        <FormTodo addTodo={addTodo} />
        <ul className={styles.todolist}>
          {todos.map((todo) => {
            return (
              <ItemTodo
                key={todo.id}
                id={todo.id}
                content={todo.content}
                removeTodo={removeTodo}
              />
            );
          })}
        </ul>
      </div>
      <GetWeather toggle={toggle} toggleWeather={toggleWeather} />
    </div>
  );
}

export default App;
