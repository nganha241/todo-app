import React from 'react';
import './datepicker.css';

interface props {
  setDatePicker: React.Dispatch<React.SetStateAction<string>>
  editDeadline: string
}
export const DatePicker = ({ setDatePicker, editDeadline }: props): JSX.Element => {
  const dt = new Date();
  dt.setMinutes(dt.getMinutes() - dt.getTimezoneOffset());
  const minDate = (dt.toISOString().slice(0, 16));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setDatePicker(e.target.value);
  };
  return <div className='input-date'>
    <input type="datetime-local" min={minDate} onChange={handleOnChange} placeholder='Dealine' defaultValue={editDeadline} />
  </div>;
};
