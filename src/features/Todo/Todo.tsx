import React from 'react';
import './Todo.css';

export const Todo = (): JSX.Element => {
  return (
    <div className='todo'>
      <div className='add-todo'>Add new...</div>
      <div className='todo-list'>
      </div>
      <div className='footer'>
        <div className='total'>1 item</div>
      </div>
    </div>
  );
};
