import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(
	'todos/fetchTodos',
	async function (_, { rejectWithValue }) {
		try {
			const response = await fetch(
				'https://todo-list-redux-b1920-default-rtdb.firebaseio.com/todo.json',
			)
			if (!response.ok) {
				throw new Error('Server Error')
			}
			const data = await response.json()
			const generatedData = []
			for (const key in data) {
				generatedData.push({
					id: key,
					title: data[key].title,
					completed: data[key].completed,
				})
			}
			return generatedData
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const addNewTodo = createAsyncThunk(
	'todos/addNewTodo',
	async function (title, { rejectWithValue, dispatch }) {
		try {
			
			const todo = {
				id: Math.random().toString(),
				title,
				completed: false,
				
			}

			const response = await fetch(
				'https://todo-list-redux-b1920-default-rtdb.firebaseio.com/todo.json',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(todo),
				},
			)
			const data = await response.json()

			if (!response.ok) {
				throw new Error("Can't add task. Server error.")
			}
			dispatch(addTodo(todo))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)
export const deleteNewTodo = createAsyncThunk(
	'todos/delateNewTodo',
	async function (id, { rejectWithValue, dispatch }) {
		try {
			const response = await fetch(
				`https://todo-list-redux-b1920-default-rtdb.firebaseio.com/todo/${id}.json`,
				{
					method: 'DELETE',
				},
			)
			if (!response.ok) {
				throw new Error("Can't delete task. Server error.")
			}

			dispatch(deleteTodo({ id }))
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)

export const toogleStatus = createAsyncThunk(
	'todos/toggleStatus',
	async function (id, { rejectWithValue, dispatch, getState }) {
		const todo = getState().todos.todos.find((todo) => todo.id === id)
		console.log(todo)
		try {
			const response = await fetch(
				`https://todo-list-redux-b1920-default-rtdb.firebaseio.com/todo/${id}.json`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						completed: !todo.completed,
					}),
				},
			)
			if (!response.ok) {
				throw new Error("Can't toggle status. Server error.")
			}
			dispatch(toggleComplete({id}))			
		} catch (error) {
			return rejectWithValue(error.message)
		}
	},
)
const setError = (state, action) => {
	state.status = 'rejected'
	state.error = action.payload
}

const todo = createSlice({
	name: 'todos',
	initialState: {
		todos: [],
		status: null,
		error: null,
	},
	reducers: {
		addTodo: (state, action) => {
			// state.todos.push(action.payload);
			state.todos.push({
				id: Date.now(),
				title: action.payload.title,
				completed:false
			})
			
		},
		toggleComplete: (state, action) => {
			const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
		},
		deleteTodo: (state, action) => {
			state.todos = state.todos.filter(
				(todo) => todo.id !== action.payload.id,
			)
		},
	},
	extraReducers: {
		[fetchTodos.pending]: (state) => {
			state.status = 'loading'
			state.error = null
		},
		[fetchTodos.fulfilled]: (state, action) => {
			state.status = 'resolved'
			state.todos = action.payload
		},
		[fetchTodos.rejected]: setError,
		[deleteNewTodo.rejected]: setError,
		[toogleStatus.rejected]: setError,
	},
})
export const { addTodo, toggleComplete, deleteTodo } = todo.actions
export default todo.reducer
