function TodoItem({ todos = [] }) {
  // 전체 개수
  const allCount = todos.length;
  // 진행중(완료되지 않은 것)
  const activeCount = todos.filter(todo => !todo.completed).length;
  // 완료된 것
  const completedCount = todos.filter(todo => todo.completed).length;
  return (
    <div className="todo-counter">
      <dl className="todo-counter__group">
        <dt className="todo-counter__title">ALL</dt>
        <dd className="todo-counter__count">{allCount}</dd>
        <dt className="todo-counter__title">ACTIVE</dt>
        <dd className="todo-counter__count">{activeCount}</dd>
        <dt className="todo-counter__title">COMPLETED</dt>
        <dd className="todo-counter__count">{completedCount}</dd>   
      </dl>
    </div>
  )
}

export default TodoItem;
