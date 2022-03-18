import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteNewTodo,  toogleStatus,  } from '../../store/todo'
import './TodoItem.css'
const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch()

	const handleCheckboxClick = () => {
		dispatch(toogleStatus( id))
	}

	const handleDeleteClick = () => {
		dispatch(deleteNewTodo( id ))
	}
	return (
		<div
			className={`list-group-item `}
		>
			<div className='d-flex'>
				<span>
					<div className='inp_title'>
						<label className='switch'>
							<input type='checkbox' 
							checked={completed}
							onChange={handleCheckboxClick}/>
							<span className='slider'></span>
						</label>
						<div className='title_container'>
                            <p className={!completed ? 'title' : 'done'}>{title}</p>
                        </div>
					</div>
				</span>
				<button onClick={handleDeleteClick} className='delete'>
					<span className='text'>Delete</span>
					<span className='icon'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 24 24'
						>
							<path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z'></path>
						</svg>
					</span>
				</button>
			</div>
		</div>
	)
}
export default TodoItem
