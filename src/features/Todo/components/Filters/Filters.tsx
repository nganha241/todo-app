import React, { Dispatch, SetStateAction, useState } from 'react';
import './Filter.css';
import { EClassStatus, EStatus } from '../../interfaces/const';

interface props {
  setSort: Dispatch<SetStateAction<string>>
  completed: number
  active: number
  all: number
}

export const Filters = ({ setSort, completed, active, all }: props): JSX.Element => {
  const [activeClass, setActiveClass] = useState<string>(EStatus.All);
  const handleFilter = (filter: string): void => {
    setSort(filter);
    setActiveClass(filter);
  };
  return <React.Fragment>
    <div onClick={() => handleFilter(EStatus.All)}
      className={activeClass === EStatus.All ? EClassStatus.IsActive : EClassStatus.FilterName}>All ({all})</div>
    <div onClick={() => handleFilter(EStatus.Active)}
      className={activeClass === EStatus.Active ? EClassStatus.IsActive : EClassStatus.FilterName}>Active ({active})</div>
    <div onClick={() => handleFilter(EStatus.Completed)}
      className={activeClass === EStatus.Completed ? EClassStatus.IsActive : EClassStatus.FilterName}>Completed ({completed})</div>
  </React.Fragment>;
};
