import React, { useContext, useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import { Modal } from './components/Modal/Modal';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoContext } from './contexts/TodoContext';
import './Todo.css';

export const Todo = (): JSX.Element => {
  const { todoState, tickTodo } = useContext(TodoContext);
  const todos = todoState.todos;
  const [isShow, setShow] = useState(false);
  const [sort, setSort] = useState('All');
  const [click, setClick] = useState();
  const handleClickShowModal = (): void => {
    setShow(true);
  };

  useEffect(() => {
    if (click !== undefined) {
      void tickTodo(click, true);
    }
  }, [click]);

  return (
    <div className='todo'>
      {isShow ? <Modal setShow={setShow}/> : ''}
      <div className='add-todo' onClick={handleClickShowModal}>Add new...</div>
      <div className='todo-list'>
        {sort === 'Active'
          ? todos.map((todo: any) => {
            return (
              todo.isCompleted === false &&
              (<TodoItem
                key={todo.id}
                description={todo.description} deadline={todo.deadline} isCompleted={todo.isCompleted} id={todo.id} setClick={setClick}
              />)
            );
          })
          : null}
        {sort === 'Completed'
          ? todos.map((todo: any) => {
            return (
              todo.isCompleted === true &&
                (<TodoItem
                  key={todo.id}
                  description={todo.description} deadline={todo.deadline} isCompleted={todo.isCompleted} id={todo.id} setClick={setClick}
                />)
            );
          })
          : null}
        {sort === 'All'
          ? todos.map((todo: any) => {
            return (
              <TodoItem
                key={todo.id}
                description={todo.description} deadline={todo.deadline} isCompleted={todo.isCompleted} id={todo.id} setClick={setClick}
              />
            );
          })
          : null}
      </div>
      <div className='footer'>
        <Filters setSort={setSort}/>
      </div>
    </div>
  );
};
