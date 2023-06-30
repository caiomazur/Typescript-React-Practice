import React, { useRef } from "react";
import "./styles.css";

interface Props {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

//const InputField = ({ toDo, setToDo, handleAdd }: Props) => {
const InputField: React.FC<Props> = ({ toDo, setToDo, handleAdd }) => {
  // Another syntax for properties inheritance.

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        placeholder="Enter a task"
        className="input__box"
        value={toDo}
        onChange={(e) => setToDo(e.target.value)}
        ref={inputRef}
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;

/* 
The InputField component renders an input field and a submit button for adding new tasks. 
It receives toDo, setToDo, and handleAdd as props. 
The component uses the useRef hook to create a reference to the input field and focuses on it when the component mounts.

The input field's value is bound to the toDo state, 
and any changes to the input field update the state using the setToDo function. 
When the user submits the form, the handleAdd function is called, and the input field loses focus.
*/
