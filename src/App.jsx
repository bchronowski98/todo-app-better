import styles from "./App.module.scss";
import FormTodo from "./components/FormTodo.jsx";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className={styles.main}>
      <FormTodo inputValue={inputValue} onInputValueChange={setInputValue} />
    </div>
  );
}

export default App;
