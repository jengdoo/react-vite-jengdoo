import "./todo.css";
import TodoData from "./todoData";
import TodoInputBtn from "./todoInput";
import reactLogo from "../../assets/react.svg";
import { useState } from "react";
const TodoApp = () => {
  const [todoList, setTodoList] = useState([
    // { id: 1, name: "learn to react" },
    // { id: 2, name: "learn to do" },
  ]);
  // const duy = "JengDoo";
  // const age = 20;
  // const data = {
  //   address: "Ha noi",
  //   country: "Viet Nam",
  // };
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 100000),
      name: name,
    };
    setTodoList([...todoList, newTodo]); // ... todoList la lay du lieu cu trong phan const [todoList, setTodoList] = useState, newTodo set cho gia tri moi
  };
  const deleteTodo = (id) => {
    // console.log(id);
    const newTodo = todoList.filter((item) => item.id !== id);
    // console.log(">>> check newTodo:", newTodo);
    setTodoList(newTodo);
  };
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoInputBtn addNewTodo={addNewTodo} />
      {todoList.length > 0 ? (
        <TodoData todoList={todoList} deleteTodo={deleteTodo} />
      ) : (
        <div className="todo-image">
          <img src={reactLogo} className="logo" />
        </div>
      )}
      {/* {todoList.length > 0 && 
      <TodoData name={duy} age={age} data={data} todoList={todoList} />
    }
    {todoList.length === 0 && 
     <>
     <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
     </>
    } */}
    </div>
  );
};

export default TodoApp;
