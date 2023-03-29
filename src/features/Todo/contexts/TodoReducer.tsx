import { Todo, TodoState } from '../interfaces/interfaces';

type TodoAction =
| { type: 'allTodo', payload: Todo }
| { type: 'addTodo', payload: Todo }
| { type: 'deleteTodo', payload: string }
| { type: 'editTodo', payload: Todo }
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
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload)
      };
    case 'editTodo':
      return {
        ...state,
        todos: state.todos.map(({ ...todo }) => {
          if (todo.id === action.payload.id) {
            todo = action.payload;
          }
          return todo;
        }),
        loading: true
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
