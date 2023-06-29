export interface ToDo {
  id: number;
  toDo: string;
  isDone: boolean;
}

/* 

// useReducer to be implemented:

type Actions =
  | {
      type: "add";
      payload: string;
    }
  | {
      type: "remove";
      payload: number;
    }
  | {
      type: "done";
      payload: number;
    };

import React, { useReducer } from "react";
const ToDoReducer = (state: ToDo[], action: Actions) => {};
const model = () => {
  const [state, dispatch] = useReducer(ToDoReducer, []);
  return <div>model</div>;
};

export default model; */
