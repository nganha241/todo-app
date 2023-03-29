import React, { useContext, useState } from 'react';
import { TextField } from '../../../../components/TextField/TextField';
import './Modal.css';
import { FaTimesCircle } from 'react-icons/fa';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { TodoContext } from '../../contexts/TodoContext';
interface props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  editDescription: string
  editDeadline: string
}
export const Modal = ({ setShow, id, editDeadline, editDescription }: props): JSX.Element => {
  const { addTodo, editTodo } = useContext(TodoContext);
  const [description, setDescription] = useState();
  const [deadline, setDatePicker] = useState();
  const [errDesc, setErrDesc] = useState('');
  const [errDate, setErrDate] = useState('');
  const handleClickShowModal = (): void => {
    setShow(false);
  };
  const handleAdd = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (description === undefined || deadline === undefined) {
      if (description === undefined) {
        setErrDesc('* It is required!');
      } else {
        setErrDesc('');
      }
      if (deadline === undefined) {
        setErrDate('* It is required!');
      } else {
        setErrDate('');
      }
    } else {
      if (id !== '') {
        void editTodo(id, { description, deadline });
      } else {
        void addTodo({ description, deadline });
      }
      setShow(false);
    }
  };
  return <div className='modal-add'>
    <div className='modal-form'>
      <div className='modal-close' onClick={handleClickShowModal}><FaTimesCircle/></div>
      <form className='form' onSubmit={handleAdd}>
        <TextField placeholder='Add new...' setDescription={setDescription} editDescription={editDescription}/>
        <div className='err'>{errDesc}</div>
        <DatePicker setDatePicker={setDatePicker} editDescription={editDeadline}/>
        <div className='err'>{errDate}</div>
        <div className='btn-form'>
          <button className='btn-add'>Add new</button>
          <button className='btn-cancel' onClick={handleClickShowModal}>Cancel</button>
        </div>
      </form>
    </div>
  </div>;
};
