import React from 'react';
import './datepicker.css';
interface props {
  setDatePicker: any
}
export const DatePicker = ({ setDatePicker }: props): JSX.Element => {
  return <div className='input-date'>
    <input type="datetime-local" onChange={(e) => setDatePicker(e.target.value)} placeholder='Dealine' />
  </div>;
};
