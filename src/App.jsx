import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo.jsx";
import GetWeather from "./components/GetWeather.jsx";
import { ReactComponent as ToggleButton } from "./assets/day-sunny.svg";

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

  const editTodo = (e, id, newTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, content: newTodo };
        }
        return todo;
      })
    );
  };
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <div className={styles.title}>
          <h4>TASKS</h4>
          {!toggle && (
            <button onClick={toggleWeather}>
              <ToggleButton />
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
                editTodo={editTodo}
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
