import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { TodoState } from '../interfaces/interfaces';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';

const INITIAL_STATE: TodoState = {
  todos: [],
  succsess: false,
  fail: false,
  loading: false
};

interface props {
  children: JSX.Element | JSX.Element[]
}

const BaseUrl = process.env.REACT_APP_API as string;

export const TodoProvider = ({ children }: props): JSX.Element => {
  const loading = (): void => {
    dispatch({ type: 'succsess', payload: true });
    setTimeout(() => {
      dispatch({ type: 'loading', payload: false });
      dispatch({ type: 'succsess', payload: false });
    }, 500);
  };

  const fail = (): void => {
    dispatch({ type: 'fail', payload: true });
    dispatch({ type: 'loading', payload: false });
    setTimeout(() => {
      dispatch({ type: 'fail', payload: false });
    }, 500);
  };

  const allTodo = async (): Promise<void> => {
    dispatch({ type: 'loading', payload: true });
    try {
      const res = await axios.get(`${BaseUrl}`);
      dispatch({ type: 'allTodo', payload: res.data });
      dispatch({ type: 'loading', payload: false });
    } catch (error) {
      fail();
    }
  };
  useEffect(() => {
    void allTodo();
  }, []);

  async function addTodo (body: { description: string, deadline: string }): Promise<void> {
    dispatch({ type: 'loading', payload: true });
    try {
      const res = await axios.post(`${BaseUrl}`, body).then();
      dispatch({ type: 'addTodo', payload: res.data });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function deleteTodo (id: string): Promise<void> {
    dispatch({ type: 'loading', payload: true });
    try {
      await axios.delete(`${BaseUrl}` + '/' + `${id}`).then();
      dispatch({ type: 'deleteTodo', payload: id });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function editTodo (id: string, body: { description: string, deadline: string }): Promise<void> {
    dispatch({ type: 'loading', payload: true });
    try {
      const res = await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: 'editTodo', payload: res.data });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function tickTodo (id: string, body: { isCompleted: boolean }): Promise<void> {
    dispatch({ type: 'loading', payload: true });
    try {
      await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: 'tickTodo', payload: id });
      loading();
    } catch (error) {
      fail();
    }
  }

  const [todoState, dispatch] = useReducer(TodoReducer, INITIAL_STATE);
  return (
    <TodoContext.Provider value={{ todoState, allTodo, addTodo, deleteTodo, tickTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
