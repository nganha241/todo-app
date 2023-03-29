import { createContext } from 'react';
import { TodoState } from '../interfaces/interfaces';

export interface TodoContextProps {
  todoState: TodoState
  allTodo: () => Promise<void>
  addTodo: (body: {description: string, deadline: string}) => Promise<void>
  deleteTodo: (id: string) => Promise<void>
  editTodo: (id: string, body: {description: string, deadline: string}) => Promise<void>
  tickTodo: (id: string, body: {isCompleted: boolean}) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const TodoContext = createContext<TodoContextProps>({} as TodoContextProps);
