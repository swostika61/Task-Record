import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import "./style.css";
import TodoList from "./TodoList";
// DEFINING PROPS
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};
// SINGLE TASK
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  // handlening done part
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  // handeling delete part
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
  useEffect(() => {
    inputRef.current?.focus();
  },[edit])
  // inputRef 
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          className="todos__single--text"
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}
      <div>
        <span
          className="icon"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <i className="fa-solid fa-trash"></i>
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <i className="fa-solid fa-check"></i>
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
