import React, { useState } from 'react';
import './TodoItem.css';
import { FaTimesCircle, FaPencilAlt } from 'react-icons/fa';
import { Notification } from '../Notification/Notification';
import { Modal } from '../Modal/Modal';
import moment, { Moment } from 'moment';

interface props {
  description: string
  deadline: string
  isCompleted: boolean
  id: string
  setClick: React.Dispatch<React.SetStateAction<string>>
}

export const TodoItem = ({ description, deadline, isCompleted, id, setClick }: props): JSX.Element => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [idDelete, setId] = useState<string>('');

  const [isEdit, setEdit] = useState<boolean>(false);
  const [descriptionE, setDescription] = useState<string>('');
  const [deadlineE, setDeadline] = useState<string>('');

  const handleCompleted = (id: string): void => {
    setClick(id);
  };
  const showNotification = (id: string): void => {
    setDeleteModal(true);
    setId(id);
  };
  const handleEdit = (id: string, description: string, deadline: string): void => {
    setEdit(true);
    setId(id);
    setDescription(description);
    setDeadline(deadline);
  };

  const convertDate = (date: Moment): number => {
    const now = moment().toArray();
    return date.diff(now, 'minutes');
  };

  return (
    <>
      {deleteModal ? <Notification setDeleteModal={setDeleteModal} id={idDelete} /> : ''}
      {isEdit ? <Modal setShow={setEdit} id={idDelete} editDescription={descriptionE} editDeadline={deadlineE} /> : ''}
      <div className='todo-item'>
        <input
          className={isCompleted ? 'check' : ''}
          type="checkbox"
          disabled={isCompleted}
          defaultChecked={isCompleted} onChange={() => handleCompleted(id)} /><span></span>
        <label className={isCompleted ? 'todo-completed' : 'todo-title'}>{description}</label>
        <div className='todo-action'>
          <button onClick={() => handleEdit(id, description, deadline)} className={isCompleted ? 'todo-disabled' : 'todo-edit'} disabled={isCompleted}><FaPencilAlt /></button>
          <div className='todo-delete' onClick={() => showNotification(id)}><FaTimesCircle /></div>
        </div>
        <div className='todo-dealine'>
          <span>{convertDate(moment(deadline)) <= 60 && isCompleted
            ? `You have ${moment(deadline).endOf('hour').fromNow()} left to complete`
            : ''}</span>
        </div>
      </div>
    </>
  );
};
