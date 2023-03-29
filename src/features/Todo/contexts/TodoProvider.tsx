import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { Todo, TodoState } from '../interfaces/interfaces';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';

const INITIAL_STATE: TodoState = {
  todos: [],
  loading: false,
  nbpages: 0,
  page: 0
};

interface props {
  children: JSX.Element | JSX.Element[]
}

export const TodoProvider = ({ children }: props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const allTodo = async () => {
    try {
      const res = await axios.get('https://6411611663cb211e7e0d2a99.mockapi.io/todo/v1/todos').then();
      dispatch({ type: 'allTodo', payload: res.data });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    void allTodo();
  }, []);

  async function addTodo (body: {description: string, deadline: string}): Promise<void> {
    try {
      const res = await axios.post('https://6411611663cb211e7e0d2a99.mockapi.io/todo/v1/todos', body).then();
      dispatch({ type: 'addTodo', payload: res.data });
      dispatch({ type: 'loading', payload: true });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo (id: string): Promise<void> {
    try {
      await axios.delete(`https://6411611663cb211e7e0d2a99.mockapi.io/todo/v1/todos/${id}`).then();
      dispatch({ type: 'deleteTodo', payload: id });
      dispatch({ type: 'loading', payload: true });
    } catch (error) {
      console.log(error);
    }
  }

  async function editTodo (id: string, body: Todo): Promise<void> {
    try {
      const res = await axios.put(`https://6411611663cb211e7e0d2a99.mockapi.io/todo/v1/todos/${id}`, body);
      dispatch({ type: 'editTodo', payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }

  async function tickTodo (id: string, body: boolean): Promise<void> {
    try {
      await axios.put(`https://6411611663cb211e7e0d2a99.mockapi.io/todo/v1/todos/${id}`, body).then();
      dispatch({ type: 'tickTodo', payload: id });
    } catch (error) {
      console.log(error);
    }
  }

  const [todoState, dispatch] = useReducer(TodoReducer, INITIAL_STATE);
  return (
    <TodoContext.Provider value={{ todoState, allTodo, addTodo, deleteTodo, tickTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
