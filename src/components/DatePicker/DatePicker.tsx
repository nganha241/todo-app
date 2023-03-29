import React from 'react';
import './datepicker.css';
interface props {
  setDatePicker: any
  editDescription: string
}
export const DatePicker = ({ setDatePicker, editDescription }: props): JSX.Element => {
  return <div className='input-date'>
    <input type="datetime-local" onChange={(e) => setDatePicker(e.target.value)} placeholder='Dealine' defaultValue={editDescription}/>
  </div>;
};
