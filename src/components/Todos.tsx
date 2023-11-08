import { useSearchParams } from "react-router-dom";
import { useTodos } from "../context/Todos";

const Todos = () => {
  const { todos, toggleTodoAsCompleted , handleDelete } = useTodos();

  const [searchParam] = useSearchParams();

  const todosData = searchParam.get("todos");

  let filterData = todos;


  if(todosData === "active"){
    filterData = filterData.filter(todo => todo.completed != true)
  }
  if(todosData === "completed"){
    filterData = filterData.filter(todo => todo.completed != false)
  }
  
  return (
    <ul>
      {filterData.map((todo) => {
        return <li key={todo.id}>
            <input type="checkbox" id={`todo-${todo.id}`} checked={todo.completed} onChange={() => toggleTodoAsCompleted(todo.id)}/>
            <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
            {
                todo.completed && (
                    <button type="button" onClick={()=> handleDelete(todo.id)}>Delete</button>
                )
            }
        </li>;
      })}
    </ul>
  );
};
export default Todos;
