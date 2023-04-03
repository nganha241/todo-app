import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { ITodoState } from '../interfaces/interfaces';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';
import { EActionType } from '../interfaces/const';

const INITIAL_STATE: ITodoState = {
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
    dispatch({ type: EActionType.Succsess, payload: true });
    setTimeout(() => {
      dispatch({ type: EActionType.Loading, payload: false });
      dispatch({ type: EActionType.Succsess, payload: false });
    }, 500);
  };

  const fail = (): void => {
    dispatch({ type: EActionType.Fail, payload: true });
    dispatch({ type: EActionType.Loading, payload: false });
    setTimeout(() => {
      dispatch({ type: EActionType.Fail, payload: false });
    }, 500);
  };

  const allTodo = async (): Promise<void> => {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      const res = await axios.get(`${BaseUrl}`).then();
      dispatch({ type: EActionType.AllTodo, payload: res.data });
      dispatch({ type: EActionType.Loading, payload: false });
    } catch (error) {
      fail();
    }
  };
  useEffect(() => {
    void allTodo();
  }, []);

  async function addTodo (body: { description: string, deadline: string }): Promise<void> {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      const res = await axios.post(`${BaseUrl}`, body).then();
      dispatch({ type: EActionType.AddTodo, payload: res.data });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function deleteTodo (id: string): Promise<void> {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      await axios.delete(`${BaseUrl}` + '/' + `${id}`).then();
      dispatch({ type: EActionType.DeleteTodo, payload: id });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function editTodo (id: string, body: { description: string, deadline: string }): Promise<void> {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      const res = await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: EActionType.EditTodo, payload: res.data });
      loading();
    } catch (error) {
      fail();
    }
  }

  async function tickTodo (id: string, body: { isCompleted: boolean }): Promise<void> {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      await axios.put(`${BaseUrl}` + '/' + `${id}`, body).then();
      dispatch({ type: EActionType.TickTodo, payload: id });
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
