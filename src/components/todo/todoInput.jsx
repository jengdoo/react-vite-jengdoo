
const TodoInputBtn = (props)=>{
  const {addNewTodo} = props
  // addNewTodo("duy")
  const click = ()=>{
    alert("click me?");
  }
  const change = (name)=>{
    console.log(">>> onchange",name)  
  }
    return (
        <>
        <div className='todo-input'>
            <input type="text" placeholder='Enter your task' onChange={(event)=>{change(event.target.value)}} />
            <button onClick={click}>Add</button>
        </div>
        </>
    );
}
export default TodoInputBtn;