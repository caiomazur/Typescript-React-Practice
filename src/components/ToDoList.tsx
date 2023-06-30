import React from "react";
import "./styles.css";
import { ToDo } from "../model";
import SingleToDo from "./SingleToDo";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
  completedToDos: ToDo[];
  setCompletedToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoList: React.FC<Props> = ({
  toDos,
  setToDos,
  completedToDos,
  setCompletedToDos,
}) => {
  return (
    <div className="container">
      <Droppable droppableId="ToDosList">
        {(provided, snapshot) => (
          <div
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>

            {/* Render SingleToDo components for each active task */}
            {toDos.map((toDo, index) => (
              <SingleToDo
                index={index}
                toDo={toDo}
                toDos={toDos}
                key={toDo.id}
                setToDos={setToDos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="ToDosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>

            {/* Render SingleToDo components for each completed task */}
            {completedToDos.map((toDo, index) => (
              <SingleToDo
                index={index}
                toDo={toDo}
                toDos={completedToDos}
                key={toDo.id}
                setToDos={setCompletedToDos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ToDoList;

/* 
In the ToDoList component, we use the Droppable component from react-beautiful-dnd 
to define droppable areas for active tasks and completed tasks. 
We map over the toDos and completedToDos arrays to render the SingleToDo component for each task.
 */