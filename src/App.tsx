import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { ToDo } from "./model";
import ToDoList from "./components/ToDoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {
  // Define state variables using useState hooks
  const [toDo, setToDo] = useState<string>(""); // Represents the current input value in the text field
  const [toDos, setToDos] = useState<ToDo[]>([]); // Represents the list of active tasks
  const [completedToDos, setCompletedToDos] = useState<ToDo[]>([]); // Represents the list of completed tasks

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (toDo) {
      // Create a new task object and add it to the active tasks list
      setToDos([...toDos, { id: Date.now(), toDo, isDone: false }]);
      setToDo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = toDos,
      complete = completedToDos;

    if (source.droppableId === "ToDosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "ToDosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    // Update the active and completed tasks lists with the reordered tasks
    setCompletedToDos(complete);
    setToDos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading"> Taskify</span>
        {/* Pass the necessary props to the InputField component */}
        <InputField toDo={toDo} setToDo={setToDo} handleAdd={handleAdd} />

        {/* Pass the necessary props to the ToDoList component */}
        <ToDoList
          toDos={toDos}
          setToDos={setToDos}
          completedToDos={completedToDos}
          setCompletedToDos={setCompletedToDos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

/* 
In the code above, we import the necessary modules, define state variables using the useState hook, 
and implement the handleAdd function to add new tasks to the list of active tasks. 
We also define the onDragEnd function to handle drag and drop functionality using react-beautiful-dnd. 
*/
