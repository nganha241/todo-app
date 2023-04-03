import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { TodoState } from '../interfaces/interfaces';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';
import { Type } from '../interfaces/const';

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
    dispatch({ type: Type.Succsess, payload: true });
    setTimeout(() => {
      dispatch({ type: Type.Loading, payload: false });
      dispatch({ type: Type.Succsess, payload: false });
    }, 500);
  };

  const fail = (): void => {
    dispatch({ type: Type.Fail, payload: true });
    dispatch({ type: Type.Loading, payload: false });
    setTimeout(() => {
      dispatch({ type: Type.Fail, payload: false });
    }, 500);
  };

  const allTodo = async (): Promise<void> => {
    dispatch({ type: Type.Loading, payload: true });
    try {
      const res = await axios.get(`${BaseUrl}`).then();
      dispatch({ type: Type.AllTodo, payload: res.data });
      console.log(typeof Object.entries(res.data));
      dispatch({ type: Type.Loading, payload: false });
    } catch (error) {
      fail();
    }
  };
  useEffect(() => {
    void allTodo();
  }, []);

  async function addTodo (body: { description: string, deadline: string }): Promise<void> {
    dispatch({ type: Type.Loading, payload: true });
    try {
      const res = await axios.post(`${BaseUrl}`, body).then();
      dispatch({ type: Type.AddTodo, payload: res.data });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function deleteTodo (id: string): Promise<void> {
    dispatch({ type: Type.Loading, payload: true });
    try {
      await axios.delete(`${BaseUrl}` + '/' + `${id}`).then();
      dispatch({ type: Type.DeleteTodo, payload: id });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function editTodo (id: string, body: { description: string, deadline: string }): Promise<void> {
    dispatch({ type: Type.Loading, payload: true });
    try {
      const res = await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: Type.EditTodo, payload: res.data });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function tickTodo (id: string, body: { isCompleted: boolean }): Promise<void> {
    dispatch({ type: Type.Loading, payload: true });
    try {
      await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: Type.TickTodo, payload: id });
      loading();
    } catch (error) {
      fail();
    }
  }

  const [todoState, dispatch] = useReducer(TodoReducer, INITIAL_STATE);
  return (
    <TodoContext.Provider value={{ todoState, addTodo, deleteTodo, tickTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
