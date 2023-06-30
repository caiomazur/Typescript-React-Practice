import React, { useEffect, useRef, useState } from "react";
import { ToDo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  toDo: ToDo;
  toDos: ToDo[];
  setToDos: React.Dispatch<React.SetStateAction<ToDo[]>>;
};

const SingleToDo = ({ index, toDo, toDos, setToDos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editToDo, setEditToDo] = useState<string>(toDo.toDo);

  const handleDone = (id: number) => {
    setToDos(
      toDos.map((toDo) =>
        toDo.id === id ? { ...toDo, isDone: !toDo.isDone } : toDo
      )
    );
  };

  const handleDelete = (id: number) => {
    setToDos(toDos.filter((toDo) => toDo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setToDos(
      toDos.map((toDo) => (toDo.id === id ? { ...toDo, toDo: editToDo } : toDo))
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable draggableId={toDo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, toDo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editToDo}
              onChange={(e) => setEditToDo(e.target.value)}
              className="todos__single--text"
            />
          ) : toDo.isDone ? (
            <s className="todos__single--text">{toDo.toDo}</s>
          ) : (
            <span className="todos__single--text">{toDo.toDo}</span>
          )}

          <div>
            {/* Edit task */}
            <span
              className="icon"
              onClick={() => {
                if (!edit && !toDo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>

            {/* Delete task */}
            <span className="icon" onClick={() => handleDelete(toDo.id)}>
              <AiFillDelete />
            </span>

            {/* Toggle task completion */}
            <span className="icon" onClick={() => handleDone(toDo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleToDo;

/* 
In the SingleToDo component, we define the behavior and rendering of an individual task. 
It uses the Draggable component from react-beautiful-dnd to make each task draggable. 
The component receives index, toDo, toDos, and setToDos as props.

The component has state variables edit and editToDo to handle editing the task. 
When the user clicks the edit icon, it toggles the edit state and allows the task text to be edited. 
The updated task text is saved in editToDo state. 
The task's completion status is toggled using the handleDone function, and the task can be deleted using the handleDelete function.

The component renders a form element with conditional rendering based on the edit state and the task's completion status. 
If edit is true, an input field is rendered to edit the task text. 
If the task is completed (isDone is true), the task text is rendered with a strikethrough using the <s> HTML element. 
Otherwise, the task text is rendered as a <span> element. 
*/
