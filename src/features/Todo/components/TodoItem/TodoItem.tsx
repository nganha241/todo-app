import React from 'react';
import './TodoItem.css';
import { FaTimesCircle, FaPencilAlt } from 'react-icons/fa';

interface props {
  description: string
  deadline: string
  isCompleted: boolean
  id: string
  setClick: any
}

export const TodoItem = ({ description, deadline, isCompleted, id, setClick }: props): JSX.Element => {
  const handleCompleted = (id: string): any => {
    setClick(id);
  };
  return (
    <>
      <div className='todo-item'>
        <input className={isCompleted ? 'check' : ''} type="checkbox" defaultChecked={isCompleted} onChange={() => handleCompleted(id)}/><span></span>
        <label className={isCompleted ? 'todo-completed' : 'todo-title'}>{description}</label>
        <div className='todo-action'>
          <div className='todo-edit'><FaPencilAlt/></div>
          <div className='todo-delete'><FaTimesCircle/></div>
        </div>
      </div>
    </>
  );
};
