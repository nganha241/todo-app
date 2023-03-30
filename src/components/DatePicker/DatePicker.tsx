import React from 'react';
import './datepicker.css';
interface props {
  setDatePicker: any
  editDeadline: string
}
export const DatePicker = ({ setDatePicker, editDeadline }: props): JSX.Element => {
  return <div className='input-date'>
    <input type="datetime-local" onChange={(e) => setDatePicker(e.target.value)} placeholder='Dealine' defaultValue={editDeadline}/>
  </div>;
};
