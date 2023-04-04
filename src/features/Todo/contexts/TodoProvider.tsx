import React, { useEffect, useReducer } from 'react';
import { ITodoState, ITodos } from '../interfaces/interfaces';
import { TodoContext } from './TodoContext';
import { TodoReducer } from './TodoReducer';
import { EActionType } from '../interfaces/const';
import { addNewTodo, deleteATodo, editATodo, getAll, tickATodo } from '../Service/API';

const INITIAL_STATE: ITodoState = {
  todos: [],
  succsess: false,
  fail: false,
  loading: false
};

interface props {
  children: JSX.Element | JSX.Element[]
}

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

  const allTodo = (): void => {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      void getAll().then((res: ITodos) => {
        dispatch({ type: EActionType.AllTodo, payload: res });
        dispatch({ type: EActionType.Loading, payload: false });
      });
    } catch (error) {
      fail();
    }
  };
  useEffect(() => {
    void allTodo();
  }, []);

  const addTodo = async (body: { description: string, deadline: string }): Promise<void> => {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      void addNewTodo(body).then((res: ITodos) => {
        dispatch({ type: EActionType.AddTodo, payload: res });
        loading();
      });
    } catch (error) {
      fail();
    }
  };

  const deleteTodo = async (id: string): Promise<void> => {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      void deleteATodo(id).then(() => {
        dispatch({ type: EActionType.DeleteTodo, payload: id });
        loading();
      });
    } catch (error) {
      fail();
    }
  };

  const editTodo = async (id: string, body: { description: string, deadline: string }): Promise<void> => {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      void editATodo(id, body).then((res: ITodos) => {
        dispatch({ type: EActionType.EditTodo, payload: res });
        loading();
      });
    } catch (error) {
      fail();
    }
  };

  async function tickTodo (id: string, body: { isCompleted: boolean }): Promise<void> {
    dispatch({ type: EActionType.Loading, payload: true });
    try {
      void tickATodo(id, body).then(() => {
        dispatch({ type: EActionType.TickTodo, payload: id });
        loading();
      });
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
