import { createContext } from 'react';
import { Todo, TodoState } from '../interfaces/interfaces';

export interface TodoContextProps {
  todoState: TodoState
  allTodo: () => Promise<void>
  addTodo: (body: {description: string, deadline: string}) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  editTodo: (id: string, body: Todo) => Promise<void>
  tickTodo: (id: string, body: boolean) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);
