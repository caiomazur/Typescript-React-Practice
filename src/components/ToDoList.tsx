import React from "react";
import "./styles.css";
import { ToDo } from "../model";
import SingleToDo from "./SingleToDo";

interface Props {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({ toDos, setToDos }) => {
  return (
    <div className="container">
      <div className="todos">
        <span className="todos__heading">Active Tasks</span>

        {toDos.map((toDo) => (
          <SingleToDo
            toDo={toDo}
            toDos={toDos}
            key={toDo.id}
            setToDos={setToDos}
          />
        ))}
      </div>

      <div className="todos remove">
        <span className="todos__heading">Completed Tasks</span>

        {toDos.map((toDo) => (
          <SingleToDo
            toDo={toDo}
            toDos={toDos}
            key={toDo.id}
            setToDos={setToDos}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoList;
