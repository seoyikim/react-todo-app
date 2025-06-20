function TodoFilter({ todos = [], onFilterChange }) {
  // 전체 개수
  const allCount = todos.length;
  // 진행중(완료되지 않은 것)
  const activeCount = todos.filter(todo => !todo.completed).length;
  // 완료된 것
  const completedCount = todos.filter(todo => todo.completed).length;

  const handleFilterChange = (e) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="todo-counter">
      <select className="todo-counter__select" onChange={handleFilterChange}>
        <option value="all">ALL ({allCount})</option>
        <option value="active">ACTIVE ({activeCount})</option>
        <option value="completed">COMPLETED ({completedCount})</option>
      </select>
    </div>
  )
}

export default TodoFilter;
