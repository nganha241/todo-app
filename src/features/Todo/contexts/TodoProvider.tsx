import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { TodoState } from '../interfaces/interfaces';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';

const INITIAL_STATE: TodoState = {
  todos: [],
  loading: false
};

interface props {
  children: JSX.Element | JSX.Element[]
}

const BaseUrl = process.env.REACT_APP_API as string;

export const TodoProvider = ({ children }: props): JSX.Element => {
  const allTodo = async (): Promise<void> => {
    try {
      const res = await axios.get(`${BaseUrl}`).then();
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
      const res = await axios.post(`${BaseUrl}`, body).then();
      dispatch({ type: 'addTodo', payload: res.data });
      dispatch({ type: 'loading', payload: true });
      setTimeout(() => {
        dispatch({ type: 'loading', payload: false });
      }, 300);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTodo (id: string): Promise<void> {
    try {
      await axios.delete(`${BaseUrl}` + '/' + `${id}`).then();
      dispatch({ type: 'deleteTodo', payload: id });
      dispatch({ type: 'loading', payload: true });
      setTimeout(() => {
        dispatch({ type: 'loading', payload: false });
      }, 300);
    } catch (error) {
      console.log(error);
    }
  }

  async function editTodo (id: string, body: {description: string, deadline: string}): Promise<void> {
    try {
      const res = await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: 'editTodo', payload: res.data });
      dispatch({ type: 'loading', payload: true });
      setTimeout(() => {
        dispatch({ type: 'loading', payload: false });
      }, 300);
    } catch (error) {
      console.log(error);
    }
  }

  async function tickTodo (id: string, body: {isCompleted: boolean}): Promise<void> {
    try {
      await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
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
