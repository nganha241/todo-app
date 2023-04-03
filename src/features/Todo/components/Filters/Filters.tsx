import React, { Dispatch, SetStateAction, useState } from 'react';
import './Filter.css';
import { ETodoStatus } from '../../interfaces/const';

interface props {
  setSort: Dispatch<SetStateAction<string>>
  completed: number
  active: number
  all: number
}

export const Filters = ({ setSort, completed, active, all }: props): JSX.Element => {
  const [activeClass, setActiveClass] = useState<string>(ETodoStatus.All);
  const handleFilter = (filter: string): void => {
    setSort(filter);
    setActiveClass(filter);
  };
  return <React.Fragment>
    <div onClick={() => handleFilter(ETodoStatus.All)}
      className={activeClass === ETodoStatus.All ? ETodoStatus.IsActive : ETodoStatus.FilterName}>All ({all})</div>
    <div onClick={() => handleFilter(ETodoStatus.Active)}
      className={activeClass === ETodoStatus.Active ? ETodoStatus.IsActive : ETodoStatus.FilterName}>Active ({active})</div>
    <div onClick={() => handleFilter(ETodoStatus.Completed)}
      className={activeClass === ETodoStatus.Completed ? ETodoStatus.IsActive : ETodoStatus.FilterName}>Completed ({completed})</div>
  </React.Fragment>;
};
