import './assets/styles/main.scss';
import { useMemo } from "react";
import TodoHeader from "./componets/TodoHeader";
import TodoInput from "./componets/TodoInput";
import TodoList from "./componets/TodoList";
import TodoFilter from "./componets/TodoFilter";
import Toast from "./componets/popup/Toast";
import { useToast } from './hooks/useToast';
import { useTodos } from './hooks/useTodos';

function App() {
  const { toasts, showToast } = useToast();
  const { 
    todos, 
    filteredTodos,
    filter,
    setFilter,
    addTodo, 
    removeTodo, 
    toggleTodo, 
    editTodo 
  } = useTodos(showToast);

  // TodoList 컴포넌트에 전달할 props를 메모이제이션
  const todoListProps = useMemo(() => ({
    todos: filteredTodos,
    onTodoRemove: removeTodo,
    onTodoToggle: toggleTodo,
    onTodoEdit: editTodo,
    filter
  }), [filteredTodos, removeTodo, toggleTodo, editTodo, filter]);

  // TodoFilter 컴포넌트에 전달할 props를 메모이제이션
  const TodoFilterProps = useMemo(() => ({
    todos,
    onFilterChange: setFilter
  }), [todos, setFilter]);

  return (
    <div className="app">
      <div className="todo">
        <TodoHeader />
        <TodoInput onTodoAdd={addTodo} />
        <TodoFilter {...TodoFilterProps} />
        <TodoList {...todoListProps} />
      </div>
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id}
            message={toast.message}
            isVisible={toast.isVisible}
            type={toast.type}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
