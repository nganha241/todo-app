import React, { useState } from 'react';
import { Modal } from './components/Modal/Modal';
import './Todo.css';

export const Todo = (): JSX.Element => {
  const [isShow, setShow] = useState(false);
  const handleClickShowModal = (): void => {
    setShow(true);
  };
  return (
    <div className='todo'>
      {isShow ? <Modal setShow={setShow}/> : ''}
      <div className='add-todo' onClick={handleClickShowModal}>Add new...</div>
      <div className='todo-list'>
      </div>
      <div className='footer'>
        <div className='total'>1 item</div>
      </div>
    </div>
  );
};
