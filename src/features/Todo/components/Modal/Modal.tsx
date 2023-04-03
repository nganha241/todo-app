import React, { useContext, useState } from 'react';
import { TextField } from '../../../../components/TextField/TextField';
import './Modal.css';
import { FaTimesCircle } from 'react-icons/fa';
import { DatePicker } from '../../../../components/DatePicker/DatePicker';
import { TodoContext } from '../../contexts/TodoContext';
import { ITodos } from '../../interfaces/interfaces';
interface props {
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  id: string
  editDescription: string
  editDeadline: string
}
export const Modal = ({ setShow, id, editDeadline, editDescription }: props): JSX.Element => {
  const { addTodo, editTodo, todoState } = useContext(TodoContext);

  const [description, setDescription] = useState<string>('');
  const [deadline, setDatePicker] = useState<string>('');

  const [validation, setValidation] = useState<{description: string, deadline: string}>({
    description: '',
    deadline: ''
  });

  const handleClickShowModal = (): void => {
    setShow(false);
  };

  const checkDesc = todoState.todos.filter((todo: ITodos): boolean => {
    return todo.description === description;
  });

  const valid = (): void => {
    const errors = JSON.parse(JSON.stringify(validation));
    if (description.trim().length === 0) {
      errors.description = 'Description is required!';
    } else {
      errors.description = '';
      if (checkDesc.length > 0) {
        errors.description = 'Description is exist!';
      } else {
        errors.description = '';
      }
    }
    if (deadline.trim().length === 0) {
      errors.deadline = 'Deadline is required!';
    } else {
      errors.deadline = '';
    }
    return setValidation(errors);
  };

  const handleAdd = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (id !== '') {
      if (description.trim().length === 0 || deadline.trim().length === 0 || checkDesc.length > 0) {
        valid();
      } else {
        void editTodo(id, { description, deadline });
        setShow(false);
      }
    } else {
      if (description.trim().length === 0 || deadline.trim().length === 0 || checkDesc.length > 0) {
        valid();
      } else {
        void addTodo({ description, deadline });
        setShow(false);
      }
    }
  };
  return <div className='modal-add'>
    <div className='modal-form'>
      <div className='modal-close' onClick={handleClickShowModal}><FaTimesCircle /></div>
      <form className='form' onSubmit={handleAdd}>
        <TextField placeholder='Add new...' setDescription={setDescription} editDescription={editDescription} />
        {(validation.description.length > 0) && <p className='err'>{validation.description}</p>}
        <DatePicker setDatePicker={setDatePicker} editDeadline={editDeadline} />
        {(validation.deadline.length > 0) && <p className='err'>{validation.deadline}</p>}
        <div className='btn-form'>
          <button className='btn-add'>{id !== '' ? 'Edit' : 'Add new'}</button>
          <button className='btn-cancel' onClick={handleClickShowModal}>Cancel</button>
        </div>
      </form>
    </div>
  </div>;
};
