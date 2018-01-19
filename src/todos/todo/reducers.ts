import { combineReducers } from 'redux';
import { SAVE_EDIT_TODO, EDIT_TODO, ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_VISIBILITY_FILTER, TOGGLE_ENABLE_TODO, IAddTodo, ISetVisibilityFilter, IToggleTodo } from './actions'
import { ITodo } from './todo';
import { IFilter, filterAll } from '../../app';


/**
 * riceve un singolo todo facente parte dello stato
 */
const todoAdd = (action: IAddTodo): ITodo  => {
  return {
    id: action.id,
		title: action.text,
    completed: false,
		enabled: true,
    editMode: false
  }
}
const todoCompleteToggle = (state: ITodo, action: IToggleTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    completed: !state.completed
  }
}
const todoEditToggle = (state: ITodo, action: IToggleTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    editMode: !state.editMode
  }
}
const todoSaveEditToggle = (state: ITodo, action: IAddTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    editMode: false,
    title: action.text
  }
}
const todoEnableToggle = (state: ITodo, action: IToggleTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    enabled: !state.enabled
  }
}
const todoDelete = (state: ITodo, action: IToggleTodo): boolean  => {
  return (state.id !== action.id);
}
/**
 * riceve un array di todo nello stato
 */
const todos = (state: ITodo[] = [], action: IAddTodo & IToggleTodo): ITodo[] => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        todoAdd(action)
      ]
    case TOGGLE_TODO:
      return state.map(t =>
        todoCompleteToggle(t, action)
      )
    case EDIT_TODO:
      return state.map(t =>
        todoEditToggle(t, action)
      )
    case SAVE_EDIT_TODO:
      return state.map(t =>
        todoSaveEditToggle(t, action)
      )
    case TOGGLE_ENABLE_TODO:
      return state.map(t =>
        todoEnableToggle(t, action)
      )
    case DELETE_TODO:
      return state.filter(t =>
        todoDelete(t, action)
      )
    default:
      return state
  }
}

/**
 * riceve un filtro nello stato
 */
const visibilityFilter = (state: IFilter = filterAll, action: ISetVisibilityFilter): IFilter => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

const todoAppReducer = combineReducers({
  todos,
  visibilityFilter
})

export default todoAppReducer;
