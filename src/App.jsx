import './components/todo/todo.css';
import TodoData from './components/todo/todoData';
import TodoInputBtn from './components/todo/todoInput';
import reactLogo from './assets/react.svg';
const App = ()=> {
  const duy = "JengDoo";
  const age = 20;
  const data = {
    address :"Ha noi",
    country :"Viet Nam"
  }
  const addNewTodo = (name)=>{
    alert(`call me?${name}`);
  };
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoInputBtn
         addNewTodo = {addNewTodo}
      />
      <TodoData 
        name= {duy}
        age = {age}
        object = {data}
      />
      <div className='todo-image'>
        <img src={reactLogo} className='logo'/>
      </div>
    </div>
  )
}

export default App
