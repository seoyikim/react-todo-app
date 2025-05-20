import './assets/styles/main.scss';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import TodoHeader from "./componets/TodoHeader";
import TodoInput from "./componets/TodoInput";
import TodoList from "./componets/TodoList";
import TodoItem from "./componets/TodoItem";

function fetchTodos() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}

function App() {
  const [todos, setTodos] = useState(fetchTodos());

  const addTodo = (todo) => {
    if (todos.some(todoItem => todoItem.text === todo.text)) {
      alert('이미 존재하는 할 일입니다.');
      return;
    }
    
    const newTodo = { ...todo, id: uuidv4() };
    const newTodos = [newTodo, ...todos];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  }

  const removeTodo = (todo) => {
    const newTodos = todos.filter(todoItem => todoItem.id !== todo.id);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  }

  const toggleTodo = (todo) => {
    const newTodos = todos.map(todoItem => 
      todoItem.id === todo.id 
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem
    );
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="todo">
        <TodoHeader />
        <TodoInput onTodoAdd={addTodo} />
        <TodoItem todos={todos} />
        <TodoList 
          todos={todos} 
          onTodoRemove={removeTodo} 
          onTodoToggle={toggleTodo}
        />
      </div>
    </div>
  )
}

export default App
