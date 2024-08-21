const TodoData = (props)=>{
    const {name,age,data} = props;
    return (
        <div className='todo-data'>
            Learn to React
            <div>My name is {name}</div>
        </div>
    );
}
export default TodoData