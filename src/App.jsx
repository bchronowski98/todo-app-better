import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todoObject) => {
    setTodos((prevTodos) => [
      { id: nanoid(3), content: todoObject },
      ...prevTodos,
    ]);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => id !== todo.id);
    setTodos(updatedTodos);
  };

  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h4 className={styles.title}>TASKS</h4>
        <FormTodo addTodo={addTodo} />
        <ul className={styles.lista}>
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
    </div>
  );
}

export default App;
