import React, { useContext } from 'react';
import './Notification.css';
import { FaTimes } from 'react-icons/fa';
import { TodoContext } from '../../contexts/TodoContext';
interface props {
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
  id: string
}
export const Notification = ({ setDeleteModal, id }: props): JSX.Element => {
  const { deleteTodo } = useContext(TodoContext);
  const handleClickNo = (): void => {
    setDeleteModal(false);
  };
  const handleClickYes = (): void => {
    void deleteTodo(id);
    setDeleteModal(false);
  };
  return (
    <div className='notification'>
      <div className='notification-box'>
        <p className='notification-title'>Do you want delete it?
          <div className='notification-icon'><FaTimes/></div>
        </p>
        <div>
          <button className='btn-yes' onClick={handleClickYes}>Yes</button>
          <button className='btn-no' onClick={handleClickNo}>No</button>
        </div>
      </div>
    </div>
  );
};
