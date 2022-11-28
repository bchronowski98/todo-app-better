import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo";
import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ItemTodo from "./components/ItemTodo";
import WeatherWidget from "./components/WeatherWidget";
import { ReactComponent as ToggleButton } from "./assets/day-sunny.svg";
import { init, updateTaskIdb, deleteTaskIdb, database } from "./idb/idb.js";

// interface;

function App() {
  const [todos, setTodos] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [editId, setEditId] = useState("");
  const [testCheck, setTestCheck] = useState(false);

  useEffect(() => {
    const initDB = async () => {
      await init()
        .then((x: any) => {
          console.log("database init");
          let todos = x.storedTodos;
          setTodos(todos.reverse());
          setTestCheck(x.checkboxValue.isChecked);
        })
        .catch(() => console.warn);
    };

    initDB().then(() => {
      console.log(":)");
      console.log(testCheck);
    });

    // console.log(items);
    // setTodos(items);
  }, []);

  useEffect(() => {
    todos.map((todo) => {
      updateTaskIdb(
        database,
        todo.id,
        todo.timeStamp,
        todo.content,
        todo.isDone
      );
    });
  }, [todos]);

  const addTodo = (todoObject) => {
    setTodos((prevTodos) => [
      {
        id: nanoid(3),
        timeStamp: new Date().getTime(),
        content: todoObject,
        isDone: false,
      },
      ...prevTodos,
    ]);
  };

  const toggleWeather = () => {
    setToggle((prevState) => !prevState);
  };

  const removeTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => id !== todo.id));
    deleteTaskIdb(database, id)
      .then(() => {
        console.log("task deleted", id);
      })
      .catch(console.warn);
  };

  const editTodo = (id: string, newTodo: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, content: newTodo };
        }
        return todo;
      })
    );
  };

  const changeDone = (id, isDone) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, isDone: isDone };
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
                    isDone={todo.isDone}
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
      <WeatherWidget
        toggle={toggle}
        setToggle={setToggle}
        isChecked={testCheck}
        setIsChecked={setTestCheck}
      />
    </div>
  );
}

export default App;
