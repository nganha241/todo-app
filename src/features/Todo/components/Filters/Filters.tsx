import React, { useState } from 'react';
import './Filters.css';

interface props {
  setSort: any
}

export const Filters = ({ setSort }: props): JSX.Element => {
  const [activeClass, setActiveClass] = useState('All');
  const handleFilter = (filter: string): void => {
    setSort(filter);
    setActiveClass(filter);
  };
  return <>
    <div onClick={() => handleFilter('All')} className={activeClass === 'All' ? 'isActive' : 'filter-name'}>All</div>
    <div onClick={() => handleFilter('Active')} className={activeClass === 'Active' ? 'isActive' : 'filter-name'}>Active</div>
    <div onClick={() => handleFilter('Completed')} className={activeClass === 'Completed' ? 'isActive' : 'filter-name'}>Completed</div>
  </>;
};
