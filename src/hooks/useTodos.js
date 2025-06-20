import { useState, useCallback, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useTodos = (showToast) => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [filter, setFilter] = useState('all');

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true; // 'all'인 경우 모든 todo 표시
        });
    }, [todos, filter]);

    const updateTodos = useCallback((newTodos) => {
        localStorage.setItem('todos', JSON.stringify(newTodos));
        setTodos(newTodos);
    }, []);

    const checkDuplicateTodo = useCallback((text, excludeId = null) => {
        return todos.some(todo => todo.text === text && todo.id !== excludeId);
    }, [todos]);

    const addTodo = useCallback((todo) => {
        if (checkDuplicateTodo(todo.text)) {
            showToast('이미 존재하는 할 일입니다.', 'error');
            return;
        }

        const newTodo = { id: uuidv4(), text: todo.text, completed: false };
        updateTodos([newTodo, ...todos]);
        showToast('할 일이 추가되었습니다.', 'success');
    }, [todos, checkDuplicateTodo, updateTodos, showToast]);

    const removeTodo = useCallback((todo) => {
        updateTodos(todos.filter(todoItem => todoItem.id !== todo.id));
        showToast('할 일이 삭제되었습니다.', 'remove');
    }, [todos, updateTodos, showToast]);

    const toggleTodo = useCallback((todo) => {
        const newTodos = todos.map(todoItem =>
            todoItem.id === todo.id
                ? { ...todoItem, completed: !todoItem.completed }
                : todoItem
        );
        updateTodos(newTodos);
    }, [todos, updateTodos]);

    const editTodo = useCallback((todo, newText) => {
        if (checkDuplicateTodo(newText, todo.id)) {
            showToast('이미 존재하는 할 일입니다.', 'error');
            return;
        }

        const newTodos = todos.map(todoItem =>
            todoItem.id === todo.id
                ? { ...todoItem, text: newText }
                : todoItem
        );
        updateTodos(newTodos);
        showToast('할 일이 수정되었습니다.', 'success');
    }, [todos, checkDuplicateTodo, updateTodos, showToast]);

    return {
        todos,
        filteredTodos,
        filter,
        setFilter,
        addTodo,
        removeTodo,
        toggleTodo,
        editTodo
    };
};
