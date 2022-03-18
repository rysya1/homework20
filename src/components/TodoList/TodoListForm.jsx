import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewTodo, addTodo } from '../../store/todo'
import './TodoListForm.css'
const TodoListForm = (props) => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const titleHandler = (e) => {
		setValue(e.target.value)
	}
	const submitHandler = (e) => {
		e.preventDefault()
		if (value.trim().length > 0) {
			dispatch(addNewTodo(value))
			setValue('')
		}
	}
	return (
		<form onSubmit={submitHandler}>
			<div className='inp_btn'>
				<input
					onChange={titleHandler}
					className='input'
					type='text'
					placeholder='Введите текст'
					value={value}
				/>
				<button className='button'>
					ADD
					<span></span>
				</button>
			</div>
		</form>
	)
}

export default TodoListForm
