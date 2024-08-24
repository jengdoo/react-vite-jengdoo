import { useState } from "react";

const TodoInputBtn = (props) => {
  const { addNewTodo } = props;
  const [valueInput, setValueInput] = useState();
  // addNewTodo("duy")
  const click = () => {
    // console.log(">>> check input:", valueInput);
    addNewTodo(valueInput);
    setValueInput("");
  };
  const change = (name) => {
    // console.log(">>> onchange", name);

    setValueInput(name);
  };
  // const valueInput = "duy";
  return (
    <>
      <div className="todo-input">
        <input
          type="text"
          value={valueInput}
          placeholder="Enter your task"
          onChange={(event) => {
            change(event.target.value);
          }}
        />
        <button onClick={click}>Add</button>
        {/* <div>My input is {valueInput}</div> */}
      </div>
    </>
  );
};
export default TodoInputBtn;
