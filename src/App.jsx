import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import { useState } from "react";
import ListTodo from "./components/ListTodo.jsx";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.main}>
      <FormTodo
        inputValue={inputValue}
        setInputValue={setInputValue}
        todos={todos}
        setTodos={setTodos}
      />
      <ListTodo todos={todos} />
    </div>
  );
}

export default App;
