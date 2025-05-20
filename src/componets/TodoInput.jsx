import { useState } from 'react';

function TodoInput({ onTodoAdd }) {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  }
    
  const handleClick = () => {
    if (!inputText.trim()) {
       alert("할 일을 입력해주세요.");
      return;
    }
    
    onTodoAdd({ text: inputText, completed: false });
    setInputText('');
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!inputText.trim()) {
       alert("할 일을 입력해주세요.");
      return;
    }
      onTodoAdd({ text: inputText, completed: false });
      setInputText('');
    }
  }

  return (
    <div className="todo-input">
      <input 
        type="text" 
        value={inputText} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown}
        className="input__field input__field--text"
        placeholder="Add your task"
      />
      <button onClick={handleClick} className="input__button input__button--add">ADD</button>
    </div>
  )
}

export default TodoInput;
