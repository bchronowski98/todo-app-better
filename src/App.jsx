import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import { useState } from "react";
import ListTodo from "./components/ListTodo.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <h4 className={styles.title}>TASKS</h4>
        <FormTodo
          inputValue={inputValue}
          setInputValue={setInputValue}
          todos={todos}
          setTodos={setTodos}
        />
        <ListTodo todos={todos} />
      </div>
    </div>
  );
}

export default App;
