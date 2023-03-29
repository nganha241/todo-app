import React, { useContext, useState } from 'react';
import { TodoContext } from '../../contexts/TodoContext';
import './TodoItem.css';
import { FaTimesCircle, FaPencilAlt } from 'react-icons/fa';
import { BsCheck2Circle } from 'react-icons/bs';
import { Notification } from '../Notification/Notification';
import { Modal } from '../Modal/Modal';

interface props {
  description: string
  deadline: string
  isCompleted: boolean
  id: string
  setClick: any
}

export const TodoItem = ({ description, deadline, isCompleted, id, setClick }: props): JSX.Element => {
  const { todoState } = useContext(TodoContext);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idDelete, setId] = useState('');

  const [isEdit, setEdit] = useState(false);
  const [decription, setDescription] = useState('');
  const [deadlineE, setDeadline] = useState('');

  const handleCompleted = (id: string): void => {
    setClick(id);
  };
  const showNotification = (id: string): void => {
    setDeleteModal(true);
    setId(id);
  };
  const handleEdit = (id: string, description: string, deadline: string): void => {
    console.log(id);
    setEdit(true);
    setId(id);
    setDescription(description);
    setDeadline(deadline);
  };

  return (
    <>
      <div>{todoState.loading
        ? <div className='return'>
          <div className='return-title'>
            <div className='return-icon'><BsCheck2Circle/></div>
            <p>Success!</p>
          </div>
        </div>
        : ''}
      </div>
      {deleteModal ? <Notification setDeleteModal={setDeleteModal} id={idDelete}/> : ''}
      {isEdit ? <Modal setShow={setEdit} id={idDelete} editDescription={decription} editDeadline={deadlineE}/> : ''}
      <div className='todo-item'>
        <input className={isCompleted ? 'check' : ''} type="checkbox" defaultChecked={isCompleted} onChange={() => handleCompleted(id)}/><span></span>
        <label className={isCompleted ? 'todo-completed' : 'todo-title'}>{description}</label>
        <div className='todo-action'>
          <div className='todo-edit' onClick={() => handleEdit(id, description, deadline)}><FaPencilAlt/></div>
          <div className='todo-delete' onClick={() => showNotification(id)}><FaTimesCircle/></div>
        </div>
      </div>
    </>
  );
};
