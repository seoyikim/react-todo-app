import { v4 as uuidv4 } from 'uuid';

function TodoList({ todos, onTodoRemove, onTodoToggle }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="message-empty">새로운 할 일을 추가해보세요!</p>
      ) : (
        <ul className="todo-list__items">
          {todos.map((todo) => {
            return (
              <li key={todo.id} className="todo-list__item">
                <div className="todo-list__item-content">
                  <input 
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    checked={todo.completed}
                    onChange={() => onTodoToggle(todo)}
                    className="input__field input__field--checkbox"
                  />
                  <label 
                    htmlFor={`todo-${todo.id}`}
                    className={"todo-list__item-text" + (todo.completed ? " completed" : "")}
                  >
                    {todo.text}
                  </label>
                </div>
                <button className="input__button input__button--remove" onClick={() => onTodoRemove(todo)}></button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default TodoList;
