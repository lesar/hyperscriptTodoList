import { html, h } from '../infernoHyperscript';
import Todo from './todo/todo';
import { ITodo } from './todo/todo';
import Component from 'inferno-component';
import { IState } from '../app';

interface ITodoListParams {
	todos: ITodo[];
	onTodoClick(id: number): void;
	onTodoEditClick(id: number): void;
	onTodoDeleteClick(id: number): void;
	onTodoToggleEnableClick(id: number): void;
	onSaveTodoEnter(e: Event, id: number, input1: HTMLInputElement):void;
};


class TodoList extends Component<ITodoListParams, IState> {
	constructor(props: ITodoListParams) {
    super(props);
	}
	render() {
		const { todos, onTodoClick, onTodoDeleteClick, onTodoToggleEnableClick, onTodoEditClick, onSaveTodoEnter }: ITodoListParams = this.props;
		if ( todos.length > 0) {
			return html.div(".w3-continer .w3-card-4",
				[ html.h4(".w3-indigo .w3-opacity", "Todo list")].concat(
					todos.map((todo: ITodo) => (
						h(Todo, {
							id: todo.id,
							title: todo.title,
							completed: todo.completed,
							enabled: todo.enabled,
							editMode: todo.editMode,
							onTodoClick,
							onTodoDeleteClick,
							onTodoToggleEnableClick,
							onTodoEditClick,
							onSaveTodoEnter
						})
					))
				)
			);
		} else {
			return;
		}
	}
}
export default TodoList;
