import React, { useContext, useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import { Modal } from './components/Modal/Modal';
import { TodoItem } from './components/TodoItem/TodoItem';
import { TodoContext } from './contexts/TodoContext';
import { Todos } from './interfaces/interfaces';
import './Todo.css';

export const Todo = (): JSX.Element => {
  const { todoState, tickTodo } = useContext(TodoContext);
  const todos = todoState.todos;
  const [isShow, setShow] = useState(false);
  const [sort, setSort] = useState('All');
  const [click, setClick] = useState();
  // const [total, setTotal] = useState(0);
  const handleClickShowModal = (): void => {
    setShow(true);
  };
  const completed = todos.filter((todo: any) => todo.isCompleted === true);
  const active = todos.filter((todo: any) => todo.isCompleted === false);

  useEffect(() => {
    if (click !== undefined) {
      void tickTodo(click, { isCompleted: true });
    }
  }, [click]);

  return (
    <div className='todo'>
      {isShow ? <Modal setShow={setShow} id='' editDescription='' editDeadline=''/> : ''}
      <div className='add-todo' onClick={handleClickShowModal}>Add new...</div>
      <div className='todo-list'>
        {sort === 'Active'
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
        {sort === 'Completed'
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
        {sort === 'All'
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
        <Filters setSort={setSort} all={todos.length} completed={completed.length} active={active.length}/>
      </div>
    </div>
  );
};
