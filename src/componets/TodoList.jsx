function TodoList({ todos, onTodoRemove, onTodoToggle }) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="todo-list__empty">새로운 할 일을 추가해보세요!</p>
      ) : (
        <ul className="todo-list__items">
          {todos.map((todo, index) => {
            return (
              <li key={index} className="todo-list__item">
                <div className="todo-list__item-content">
                  <input 
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onTodoToggle(todo)}
                    className="input__field input__field--checkbox"
                  />
                  <span 
                    className={"todo-list__item-text" + (todo.completed ? " completed" : "")}
                  >
                    {todo.text}
                  </span>
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
