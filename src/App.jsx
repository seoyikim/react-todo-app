import { useState } from "react";
import TodoHeader from "./componets/TodoHeader";
import TodoInput from "./componets/TodoInput";
import TodoList from "./componets/TodoList";

function fetchTodos() {
  const result = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    result.push(key);
  }
  return result;
}

function App() {
  const [todos, setTodos] = useState(fetchTodos());

  const addTodo = (todo) => {
    localStorage.setItem(todo, todo);
    setTodos((currentTodos) => {
      return [todo, ...currentTodos];
    });
  }

  const removeTodo = (todo) => {
    const result = todos.filter(todoItem => {
      if (todoItem !== todo) {
        return true;
      }
    });
    setTodos(result);
    localStorage.removeItem(todo);
  }

  return (
    <div>
      <TodoHeader />
      <TodoInput onTodoAdd={addTodo} />
      <TodoList todos={todos} onTodoRemove={removeTodo} />
    </div>
  )
}

export default App
