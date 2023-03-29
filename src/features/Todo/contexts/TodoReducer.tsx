import { Todos, TodoState } from '../interfaces/interfaces';

type TodoAction =
| { type: 'allTodo', payload: Todos }
| { type: 'addTodo', payload: Todos }
| { type: 'deleteTodo', payload: string }
| { type: 'editTodo', payload: Todos }
| { type: 'loading', payload: boolean }
| { type: 'tickTodo', payload: string }

export const TodoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'allTodo':
      return {
        ...state,
        todos: action.payload
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
