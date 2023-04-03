import { Type } from '../interfaces/const';
import { Todos, TodoState } from '../interfaces/interfaces';

type TodoAction =
  | { type: Type.AllTodo, payload: Todos }
  | { type: Type.AddTodo, payload: Todos }
  | { type: Type.DeleteTodo, payload: string }
  | { type: Type.EditTodo, payload: Todos }
  | { type: Type.Loading, payload: boolean }
  | { type: Type.TickTodo, payload: string }
  | { type: Type.Fail, payload: boolean }
  | { type: Type.Succsess, payload: boolean }

export const TodoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'allTodo':
      return {
        ...state,
        todos: state.todos.concat(action.payload)
      };
    case 'addTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter((todo: Todos) => todo.id !== action.payload)
      };
    case 'editTodo':
      return {
        ...state,
        todos: state.todos.map(({ ...todo }) => {
          if (todo.id === action.payload.id) {
            todo = action.payload;
          }
          return todo;
        })
      };
    case 'loading':
      return {
        ...state,
        loading: action.payload
      };
    case 'fail':
      return {
        ...state,
        fail: action.payload
      };
    case 'succsess':
      return {
        ...state,
        succsess: action.payload
      };
    case 'tickTodo':
      return {
        ...state,
        todos: state.todos.map(({ ...todo }) => {
          if (todo.id === action.payload) {
            todo.isCompleted = true;
          }
          return todo;
        })
      };
    default:
      return state;
  }
};
