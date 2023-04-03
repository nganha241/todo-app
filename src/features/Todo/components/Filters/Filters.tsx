import React, { Dispatch, SetStateAction, useState } from 'react';
import './Filter.css';
import { EClassStatus, ESort } from '../../interfaces/const';

interface props {
  setSort: Dispatch<SetStateAction<string>>
  completed: number
  active: number
  all: number
}

export const Filters = ({ setSort, completed, active, all }: props): JSX.Element => {
  const [activeClass, setActiveClass] = useState<string>(ESort.All);
  const handleFilter = (filter: string): void => {
    setSort(filter);
    setActiveClass(filter);
  };
  return <React.Fragment>
    <div onClick={() => handleFilter(ESort.All)}
      className={activeClass === ESort.All ? EClassStatus.IsActive : EClassStatus.FilterName}>All ({all})</div>
    <div onClick={() => handleFilter(ESort.Active)}
      className={activeClass === ESort.Active ? EClassStatus.IsActive : EClassStatus.FilterName}>Active ({active})</div>
    <div onClick={() => handleFilter(ESort.Completed)}
      className={activeClass === ESort.Completed ? EClassStatus.IsActive : EClassStatus.FilterName}>Completed ({completed})</div>
  </React.Fragment>;
};
