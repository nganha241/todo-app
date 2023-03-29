import React from 'react';
import './textField.css';

interface props {
  placeholder: string
  setDescription: any
}

export const TextField = ({ placeholder, setDescription }: props): JSX.Element => {
  return <div className='input-todo'>
    <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder={placeholder}/>
  </div>;
};
