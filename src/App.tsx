import React from 'react';
import './App.css';
import { Header } from './features/Todo/components/Header/Header';
import { TodoProvider } from './features/Todo/contexts/TodoProvider';
import { Todo } from './features/Todo/Todo';

function App (): JSX.Element {
  return (
    <div className='App'>
      <Header/>
      <TodoProvider>
        <Todo/>
      </TodoProvider>
    </div>
  );
}

export default App;
