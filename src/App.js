import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import AddList from './components/AddList/AddList'
import TodoListForm from './components/TodoList/TodoListForm'
import { useState } from 'react'
import { fetchTodos,addNewTodo } from './store/todo'
function App() {
	const dispatch = useDispatch()
	const {status,error} = useSelector((state) => state.todos)
	useEffect(() => {
		dispatch(fetchTodos())
	},[dispatch])
	
	return (
		<div className='App'>
			<TodoListForm />
			{status === 'loading' && <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>}
			{error && <h2>An error occerd: {error}</h2>}
			<AddList />
		</div>
	)
}

export default App
