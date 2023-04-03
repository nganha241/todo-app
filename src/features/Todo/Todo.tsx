import React, { useContext, useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import { Modal } from './components/Modal/Modal';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoContext } from './contexts/TodoContext';
import { Todos } from './interfaces/interfaces';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';
import './Todo.css';
import { Sort } from './interfaces/const';

export const Todo = (): JSX.Element => {
  const { todoState, tickTodo } = useContext(TodoContext);
  const todos = todoState.todos;

  const [isShow, setShow] = useState<boolean>(false);
  const [sort, setSort] = useState('All');
  const [click, setClick] = useState<string>('');

  const handleClickShowModal = (): void => {
    setShow(true);
  };
  const completed = todos.filter((todo: Todos) => todo.isCompleted);
  const active = todos.filter((todo: Todos) => !todo.isCompleted);

  useEffect(() => {
    if (click !== '') {
      void tickTodo(click, { isCompleted: true });
    }
    setClick('');
  }, [click]);

  return (
    <>
      <div>{todoState.loading
        ? <div className='loading'>
          <div className='loading-detail'><AiOutlineLoading3Quarters /></div>
        </div>
        : ''}
      </div>
      <div>{todoState.fail === true || todoState.succsess === true
        ? <div className='return'>
          <div className='return-title'>
            {todoState.fail === true
              ? <><div className='return-icon fail'><MdErrorOutline /></div>
                <p>Fail!</p></>
              : ''}
            {todoState.succsess === true
              ? <><div className='return-icon success'><BsCheck2Circle /></div>
                <p>Success!</p></>
              : ''}
          </div>
        </div>
        : ''}
      </div>
      <div className='todo'>
        {isShow ? <Modal setShow={setShow} id='' editDescription='' editDeadline='' /> : ''}
        <div className='add-todo' onClick={handleClickShowModal}>Add new...</div>
        <div className='todo-list'>
          {sort === Sort.Active
            ? todos.map((todo: Todos) => {
              return (
                !(todo.isCompleted) &&
                (<TodoItem
                  key={todo.id}
                  description={todo.description}
                  deadline={todo.deadline}
                  isCompleted={todo.isCompleted}
                  id={todo.id} setClick={setClick}
                />)
              );
            })
            : null}
          {sort === Sort.Completed
            ? todos.map((todo: Todos) => {
              return (
                todo.isCompleted &&
                (<TodoItem
                  key={todo.id}
                  description={todo.description}
                  deadline={todo.deadline}
                  isCompleted={todo.isCompleted}
                  id={todo.id} setClick={setClick}
                />)
              );
            })
            : null}
          {sort === Sort.All
            ? todos.map((todo: Todos) => {
              return (
                <TodoItem
                  key={todo.id}
                  description={todo.description}
                  deadline={todo.deadline}
                  isCompleted={todo.isCompleted}
                  id={todo.id} setClick={setClick}
                />
              );
            })
            : null}
        </div>
        <div className='footer'>
          <Filters setSort={setSort} all={todos.length} completed={completed.length} active={active.length} />
        </div>
      </div>
    </>
  );
};
