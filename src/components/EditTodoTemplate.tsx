import React, { FormEvent, SyntheticEvent } from "react";
import styles from "./ItemTodo.module.scss";
// import { ReactComponent as Ok } from "../assets/ok.svg?";
import { ReactComponent as Ok } from "../assets/ok.svg";
import { ReactComponent as Xsign } from "../assets/x-sign.svg";

interface IEditTodoTemplate {
  handleSubmit: (e: SyntheticEvent) => void;
  handleEdit: (e: FormEvent<HTMLInputElement>) => void;
  newTodo: string;
  cancelStateOnClick: () => void;
  id: string;
}

const EditTodoTemplate: React.FC<IEditTodoTemplate> = ({
  handleSubmit,
  handleEdit,
  newTodo,
  cancelStateOnClick,
  id,
}) => {
  return (
    <li className={styles.todo} tabIndex={1}>
      <form className={styles.editForm} onSubmit={handleSubmit}>
        <div className={styles.todoEditInside}>
          <input
            id={id}
            type="text"
            onChange={handleEdit}
            value={newTodo}
            placeholder="Edit todo..."
            autoFocus={true}
            maxLength={20}
          />
          <div className={styles.editButtons}>
            <button type="submit">
              <Ok />
            </button>
            <button type="button" onClick={cancelStateOnClick}>
              <Xsign />
            </button>
          </div>
        </div>
      </form>
    </li>
  );
};

export default EditTodoTemplate;
