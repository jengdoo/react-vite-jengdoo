const TodoData = (props) => {
  const { name, todoList, deleteTodo } = props;
  //   console.log(">>> props", props);
  //   console.log(">>> props", todoList);
  const clickDelete = (item) => {
    deleteTodo(item);
  };
  return (
    <div className="todo-data">
      {todoList.map((item, index) => {
        //item la phan tu lap, index la chi so cua mang
        console.log(">>>>item,index:", item, index);
        return (
          <div className={`todoItem`} key={index}>
            <div>{item.name}</div>
            <button
              onClick={() => {
                clickDelete(item.id);
              }}
              style={{ cursor: "pointer" }}
            >
              Delete
            </button>
          </div>
        );
      })}
      Learn to React
      {/* <div>My name is {name}</div> */}
      {/* {JSON.stringify(props.todoList)} */}
    </div>
  );
};
export default TodoData;
