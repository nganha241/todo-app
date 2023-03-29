import React from 'react';
import './App.css';
import { Header } from './features/Todo/components/Header/Header';
import { Todo } from './features/Todo/Todo';

function App (): JSX.Element {
  return (
    <div className='App'>
      <Header/>
      <Todo/>
    </div>
  );
}

export default App;
