import React, { useState } from 'react';

function TodoList({ todos, onTodoRemove, onTodoToggle, onTodoEdit, filter }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleSave = (todo) => {
    if (editText.trim()) {
      onTodoEdit(todo, editText.trim());
      setEditingId(null);
    }
  };

  const handleKeyPress = (e, todo) => {
    if (e.key === 'Enter') {
      handleSave(todo);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const getEmptyMessage = () => {
    switch (filter) {
      case 'all':
        return '새로운 할 일을 추가해보세요!';
      case 'active':
        return '진행중인 할 일이 없습니다.';
      case 'completed':
        return '완료된 할 일이 없습니다.';
      default:
        return '새로운 할 일을 추가해보세요!';
    }
  };

  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="message-empty">{getEmptyMessage()}</p>
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
                  <div className="todo-list__item-info">
                    {editingId === todo.id ? (
                      <div className="todo-list__item-edit">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyDown={(e) => handleKeyPress(e, todo)}
                          className="input__field input__field--edit"
                          autoFocus
                        />
                        <button 
                          className="input__button input__button--save"
                          onClick={() => handleSave(todo)}
                        >
                          저장
                        </button>
                        <button 
                          className="input__button input__button--cancel"
                          onClick={() => setEditingId(null)}
                        >
                          취소
                        </button>
                      </div>
                    ) : (
                      <>
                        <label 
                          htmlFor={`todo-${todo.id}`}
                          className={`todo-list__item-text${todo.completed ? ' completed' : ''}`}
                        >
                          {todo.text}
                        </label>
                        <button 
                          className="input__button input__button--edit"
                          onClick={() => handleEdit(todo)}
                          aria-label="수정"
                        />
                      </>
                    )}
                  </div>
                </div>
                <button 
                  className="input__button input__button--remove" 
                  onClick={() => onTodoRemove(todo)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default TodoList;
