import React, { useContext, useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import { Modal } from './components/Modal/Modal';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoContext } from './contexts/TodoContext';
import { ITodos } from './interfaces/interfaces';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { BsCheck2Circle } from 'react-icons/bs';
import { MdErrorOutline } from 'react-icons/md';
import './Todo.css';
import { ETodoStatus } from './interfaces/const';

export const Todo = (): JSX.Element => {
  const { todoState, tickTodo } = useContext(TodoContext);
  const todos = todoState.todos;

  const [isShow, setShow] = useState<boolean>(false);
  const [sort, setSort] = useState<string>(ETodoStatus.All);
  const [click, setClick] = useState<string>('');

  const handleClickShowModal = (): void => {
    setShow(true);
  };
  const completed = todos.filter((todo: ITodos) => todo.isCompleted ?? false);
  const active = todos.filter((todo: ITodos) => !(todo.isCompleted) ?? true);

  useEffect(() => {
    if (click !== '') {
      void tickTodo(click, { isCompleted: true });
    }
    setClick('');
  }, [click]);

  return (
    <>
      <div>{todoState.loading === true
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
          {sort === ETodoStatus.Active
            ? todos.map((todo: ITodos) => {
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
          {sort === ETodoStatus.Completed
            ? todos.map((todo: ITodos) => {
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
          {sort === ETodoStatus.All
            ? todos.map((todo: ITodos) => {
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
