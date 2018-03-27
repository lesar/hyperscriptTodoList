/**
* Is better to divide this module in two: one exporting only the action creation
* the other exporting the interface. So you can import all action creation easy
* using import \* ad MyName from '...'
*/
import { IFilter } from '../../app';
/**
* auto inc value used for todo id
*/
let nextTodoId: number = 0;
/**
* base interface actions
*/
export interface IAction {
  type: string;
};
/**
* first action interface
*/
export interface IAddTodo extends IAction {
  id: number;
  text: string;
}
/**
* Action name const
*/
export const ADD_TODO = 'ADD_TODO';
/**
* first action creation object
*/
export const addTodo = (text: string): IAddTodo => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text
});

export interface ISetVisibilityFilter extends IAction {
  filter: IFilter;
}
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
export const setVisibilityFilter = (filter: IFilter): ISetVisibilityFilter => ({
  type: SET_VISIBILITY_FILTER,
  filter
});

export interface IToggleTodo extends IAction {
  id: number;
}
export const DELETE_TODO = 'DELETE_TODO';
export const deleteTodo = (id: number): IToggleTodo => ({
  type: DELETE_TODO,
  id
});
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const toggleTodo = (id: number): IToggleTodo => ({
  type: TOGGLE_TODO,
  id
});
export const EDIT_TODO = 'EDIT_TODO';
export const editTodo = (id: number): IToggleTodo => ({
  type: EDIT_TODO,
  id
});
export const SAVE_EDIT_TODO = 'SAVE_EDIT_TODO';
export const saveEditTodo = (id: number, text: string): IAddTodo => ({
  type: SAVE_EDIT_TODO,
  id,
  text
});
export const TOGGLE_ENABLE_TODO = 'TOGGLE_ENABLE_TODO';
export const toggleEnableTodo = (id: number): IToggleTodo => ({
  type: TOGGLE_ENABLE_TODO,
  id
});
