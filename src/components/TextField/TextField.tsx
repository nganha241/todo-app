import React from 'react';
import './textField.css';

interface props {
  placeholder: string
  setDescription: any
  editDescription: string
}

export const TextField = ({ placeholder, setDescription, editDescription }: props): JSX.Element => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value.trim());
  };

  return (
    <div className='input-todo'>
      <input type="text"
        onChange={handleOnChange}
        placeholder={placeholder}
        defaultValue={editDescription}
        autoFocus />
    </div>
  );
};
