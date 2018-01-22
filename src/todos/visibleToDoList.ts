import { connect } from 'inferno-redux';
import { saveEditTodo, editTodo, toggleTodo, deleteTodo, toggleEnableTodo } from './todo/actions';
import TodoList from './todolist';
import { ITodo } from './todo/todo';
import { bindActionCreators } from 'redux';
import { IState, IFilter, CompletedFilter, EnabledFilter } from '../app';


/**
* return the todos's list filtered
*/
const getVisibleTodos = function (todos: ITodo[], filter: IFilter): ITodo[] {

	/**
	* is better to make a new object so in the future we can make shallow
	* comparison [see](https://reactjs.org/docs/shallow-compare.html)
	*/
	let newTodos = todos;
	/**
	* take a first filter on completed property
	*/
	switch (filter.completed) {
		case CompletedFilter.Completed:
			newTodos = newTodos.filter(t => t.completed);
			break;
		case CompletedFilter.Uncompleted:
			newTodos = newTodos.filter(t => !t.completed);
			break;
	}
	/**
	* take a second filter on enabled property
	*/
	switch (filter.enabled) {
		case EnabledFilter.Enabled:
			newTodos = newTodos.filter(t => t.enabled);
			break;
		case EnabledFilter.Disabled:
			newTodos = newTodos.filter(t => !t.enabled);
			break;
	}
	/**
	* return the filtered todos
	*/
	return newTodos;
};

/**
* inject the filtered todos in component props.
* Current state is provided as parameter by the store.
* Use of component this.context.store.getState() is not necessary.
*/
const mapStateToProps = (state: IState) => ({
	todos: getVisibleTodos(state.todos, state.visibilityFilter)
});


/**
* inject the needed callback in component props. Each callback
* is created using the proper parameter and use the provided dispach:
* notice the call to dispach function in the arrows function.
* The Store will provide the dispach function as parameter.
* This is not necessary: see below.
*/
/*
const mapDispatchToProps = (dispatch: any) => ({
	send: {
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
		onSaveTodoEnter: (id: number, text: string) => {
	    dispatch(saveEditTodo(id, text));
	  }
	}
});
*/

/**
* bindActionCreators if first argument is an object like { name: fun1, ...} return
* an object like { name: (argsFun1) => ( dispatch( fun1(argsFun1) ) ), ... }.
* [See](https://redux.js.org/docs/api/bindActionCreators.html)
*/
const mapDispatchToProps = (dispatch: any) => ({
	send: bindActionCreators({
			onTodoClick: toggleTodo,
			onTodoEditClick: editTodo,
			onTodoDeleteClick: deleteTodo,
			onTodoToggleEnableClick: toggleEnableTodo,
			onSaveTodoEnter: saveEditTodo
	}, dispatch)
});

const VisibleTodoList = connect(
	mapStateToProps,
	mapDispatchToProps
)(TodoList);
export default VisibleTodoList;
