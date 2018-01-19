import { connect } from 'inferno-redux';
import { saveEditTodo, editTodo, toggleTodo, deleteTodo, toggleEnableTodo } from './todo/actions';
import TodoList from './todolist';
import { ITodo } from './todo/todo';
import { IState, IFilter, CompletedFilter, EnabledFilter } from '../app';


const getVisibleTodos = function (todos: ITodo[], filter: IFilter): ITodo[] {
	let newTodos = todos;
	switch (filter.completed) {
		case CompletedFilter.Completed:
			newTodos = newTodos.filter(t => t.completed);
			break;
		case CompletedFilter.Uncompleted:
			newTodos = newTodos.filter(t => !t.completed);
			break;
	}
	switch (filter.enabled) {
		case EnabledFilter.Enabled:
			newTodos = newTodos.filter(t => t.enabled);
			break;
		case EnabledFilter.Disabled:
			newTodos = newTodos.filter(t => !t.enabled);
			break;
	}
	return newTodos;
};
const mapStateToProps = (state: IState) => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = (dispatch: any) => ({
	onTodoClick: (id: number) => {
    dispatch(toggleTodo(id))
  },
	onTodoEditClick: (id: number) => {
    dispatch(editTodo(id))
  },
	onTodoDeleteClick: (id: number) => {
    dispatch(deleteTodo(id))
  },
	onTodoToggleEnableClick: (id: number) => {
    dispatch(toggleEnableTodo(id))
  },
	onSaveTodoEnter: (e: Event, id: number, input1: HTMLInputElement) => {
		e.preventDefault();
		if (!input1.value.trim()) { return }
    dispatch(saveEditTodo(id, input1.value));
  }
});

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);
export default VisibleTodoList;
