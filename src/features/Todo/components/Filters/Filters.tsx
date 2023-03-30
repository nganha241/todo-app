import React, { Dispatch, SetStateAction, useState } from 'react';
import './Filter.css';

interface props {
  setSort: Dispatch<SetStateAction<string>>
  completed: number
  active: number
  all: number
}

export const Filters = ({ setSort, completed, active, all }: props): JSX.Element => {
  console.log(completed);
  const [activeClass, setActiveClass] = useState('All');
  const handleFilter = (filter: string): void => {
    setSort(filter);
    setActiveClass(filter);
  };
  return <React.Fragment>
    <div onClick={() => handleFilter('All')}
      className={activeClass === 'All' ? 'isActive' : 'filter-name'}>All ({all})</div>
    <div onClick={() => handleFilter('Active')}
      className={activeClass === 'Active' ? 'isActive' : 'filter-name'}>Active ({active})</div>
    <div onClick={() => handleFilter('Completed')}
      className={activeClass === 'Completed' ? 'isActive' : 'filter-name'}>Completed ({completed})</div>
  </React.Fragment>;
};
