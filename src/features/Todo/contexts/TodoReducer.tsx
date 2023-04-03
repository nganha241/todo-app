import { EActionType } from '../interfaces/const';
import { ITodos, ITodoState } from '../interfaces/interfaces';

type TodoAction =
  | { type: EActionType.AllTodo, payload: ITodos }
  | { type: EActionType.AddTodo, payload: ITodos }
  | { type: EActionType.DeleteTodo, payload: string }
  | { type: EActionType.EditTodo, payload: ITodos }
  | { type: EActionType.Loading, payload: boolean }
  | { type: EActionType.TickTodo, payload: string }
  | { type: EActionType.Fail, payload: boolean }
  | { type: EActionType.Succsess, payload: boolean }

export const TodoReducer = (state: ITodoState, action: TodoAction): ITodoState => {
  switch (action.type) {
    case EActionType.AllTodo:
      return {
        ...state,
        todos: state.todos.concat(action.payload)
      };
    case EActionType.AddTodo:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case EActionType.DeleteTodo:
      return {
        ...state,
        todos: state.todos.filter((todo: ITodos) => todo.id !== action.payload)
      };
    case EActionType.EditTodo:
      return {
        ...state,
        todos: state.todos.map(({ ...todo }) => {
          if (todo.id === action.payload.id) {
            todo = action.payload;
          }
          return todo;
        })
      };
    case EActionType.Loading:
      return {
        ...state,
        loading: action.payload
      };
    case EActionType.Fail:
      return {
        ...state,
        fail: action.payload
      };
    case EActionType.Succsess:
      return {
        ...state,
        succsess: action.payload
      };
    case EActionType.TickTodo:
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
