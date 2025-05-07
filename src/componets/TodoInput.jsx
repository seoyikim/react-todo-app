import { useState } from 'react';

function TodoInput({ onTodoAdd }) {
    const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInputText(value);
  }
    
    const handleClick = (e) => {
    onTodoAdd(inputText);
    setInputText('');
    }
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onTodoAdd(inputText);
            setInputText('');
        }
    }

  return (
    <div>
      <input 
        type="text" 
        value={inputText} 
        onChange={handleChange} 
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default TodoInput;
