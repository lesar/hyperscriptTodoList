import { connect } from 'inferno-redux';
import { saveEditTodo, editTodo, toggleTodo, deleteTodo, toggleEnableTodo } from './todo/actions';
import TodoList from './todolist';
import { bindActionCreators } from 'redux';
import { IState } from '../app';
import makeGetVisibleTodos from './selectors'



/**
* inject the filtered todos in component props.
* Current state is provided as parameter by the store.
* Use of component this.context.store.getState() is not necessary.
*/
const makeMapStateToProps = () => {
	const getVisibleTodos = makeGetVisibleTodos();

	const mapStateToProps = (state: IState) => ({
		todos: getVisibleTodos(state)
	});
	return mapStateToProps;
}


/**
* **This is a valid code: is commented to show a better alternative**.
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
	makeMapStateToProps,
	mapDispatchToProps
)(TodoList);
export default VisibleTodoList;
