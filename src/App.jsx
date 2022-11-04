import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";
import GetWeather from "./components/GetWeather.jsx";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoObject) => {
    setTodos((prevTodos) => [
      { id: nanoid(3), content: todoObject },
      ...prevTodos,
    ]);
  };

  const removeTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h4 className={styles.title}>TASKS</h4>
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
      <GetWeather />
    </div>
  );
}

export default App;
