import React from 'react'
import './AddList.css'
import { useSelector } from 'react-redux'
import TodoListForm from '../TodoList/TodoListForm'
import TodoItem from '../TodoItem/TodoItem'
const AddList = (props) => {
  const todos = useSelector(state => state.todos.todos)
  console.log(todos);
  return (
    <div>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} id={todo.id} title={todo.title} completed={todo.completed}/>
        })}
    </div>
  )
}

export default AddList