import React from 'react'
import "./style.css";
import { Todo } from '../model';
import SingleTodo from './SingleTodo';
interface props{
    todos: Todo[];
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}
const TodoList = ({todos,setTodos}:props) => {
  return (
    <div className="todos">{todos.flatMap(todo => (
      <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
    ))}</div>
  )
}

export default TodoList