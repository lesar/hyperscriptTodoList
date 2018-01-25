/**
* Reducers module do the job most important in the project
* reducers take the state, the action and calculate new state.
* Reducers is used by the Store and Store provide to callback all
* connected interface.
* It is important notice that every reduce never change an object but instead
* create a new one and then change his property. This is important because several
* libraries do immutable test equality
*/
import { combineReducers } from 'redux';
import { SAVE_EDIT_TODO, EDIT_TODO, ADD_TODO, TOGGLE_TODO, DELETE_TODO, SET_VISIBILITY_FILTER, TOGGLE_ENABLE_TODO, IAddTodo, ISetVisibilityFilter, IToggleTodo } from './actions'
import { ITodo } from './todo';
import { IFilter, filterAll } from '../../app';


/**
 * build a single todo
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
/**
* find the todo using todo id then return a new todo but the completed property
* is toggle
*/
const todoCompleteToggle = (state: ITodo, action: IToggleTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    completed: !state.completed
  }
}
/**
* find the todo using todo id then return a new todo but the editMode property
* is toggle
*/
const todoEditToggle = (state: ITodo, action: IToggleTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    editMode: !state.editMode
  }
}
/**
* find the todo using todo id then return a new todo but the editMode property
* is set to false and title is update by the action
*/
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
/**
* find the todo using todo id then return a new todo but the enabled property
* is toggle
*/
const todoEnableToggle = (state: ITodo, action: IToggleTodo): ITodo  => {
  if (state.id !== action.id) {
    return state
  }

  return {
    ...state,
    enabled: !state.enabled
  }
}
/**
* Is used to filter todos to delete the action.id matching
*/
const todoDelete = (state: ITodo, action: IToggleTodo): boolean  => {
  return (state.id !== action.id);
}
/**
 * first reducer: take only his state (todos) and run action on it returning one state part
 * all reducers must return untouched state on error and on not matching action.type
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
 * second reducer: take only his state (filter) and run action on it returning one state part
 * all reducers must return untouched state on error and on not matching action.type
 */
const visibilityFilter = (state: IFilter = filterAll, action: ISetVisibilityFilter): IFilter => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      if ( state.isSameFilter(action.filter) ) {
        return state;
      }
      return action.filter
    default:
      return state
  }
}
/**
* used to make reducer more simple and then combining together.
* the name of the single reducer is important: it must match on the state property
* or you have to use an object like this
* {
*   todos: MyfavoriteName1,
*   visibilityFilter: MyfavoriteName1
* }
*/
const todoAppReducer = combineReducers({
  todos,
  visibilityFilter
})

export default todoAppReducer;
