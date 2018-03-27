/**
* Todo is a presentational component to visualize and edit todo object
*/
import html from '../../infernoHyperscript';
const { div, span, i } = html;
import classNames from 'classnames';
import Component from 'inferno-component';
import { IState } from '../../app';
import './todo.css';

/**
* Todo interface
*/
export interface ITodo {
	id: number;
	title: string;
	completed: boolean;
	enabled: boolean;
	editMode: boolean;
};
/**
* calback interface provided by the container component VisibleTodoList
*/
export interface ISendActionTodo {
	onTodoClick(id: number):void;
	onTodoEditClick(id: number):void;
	onTodoDeleteClick(id: number):void;
	onTodoToggleEnableClick(id: number):void;
	onSaveTodoEnter(id: number, text: string):void;
}

/**
* provided params to todo object
*/
interface ITodoParams extends ITodo {
	send: ISendActionTodo;
};

class Todo extends Component<ITodoParams, IState> {
	/**
	* to handle set focus and to get value
	*/
	private input1: HTMLInputElement;

	constructor(props: ITodoParams) {
    super(props);
	}
	/**
	* an example of optimization: a target check comparing only significant property
	* this is dangerous: it's easy to change ITodo interface and forget to update
	* this check. If you do not update this check your interface do no repaint on
	* changing status
	*/
	shouldComponentUpdate(
		nextProps: ITodoParams,
		nextState: IState,
		nextContext: any
	):boolean {
		let lastProps: ITodoParams = this.props;
		return !(lastProps.id == nextProps.id &&
			lastProps.title == nextProps.title &&
			lastProps.enabled == nextProps.enabled &&
			lastProps.editMode == nextProps.editMode &&
			lastProps.completed == nextProps.completed);
	}
	/**
	* on every repaint I set socus on input
	*/
	componentDidUpdate() {
		if ( this.input1 ) {
			this.input1.focus();
		}
	}
	render() {
		const { id, title, completed, enabled, editMode, send }: ITodoParams = this.props;
		return div({
				id,
				className: "w3-hover-sand w3-row-padding w3-border-grey w3-border-bottom",
			}, [
				/**
				* this is only some html and css composing. note the i element is using
				* [google material icons](https://fonts.googleapis.com/icon?family=Material+Icons)
				* I use the small [W3-CSS](https://www.w3schools.com/w3css/4/w3.css) responsive css
				*/
				div('.w3-col .w3-right w3-container', {style: 'width: 180px;'}, [
					span(".w3-tooltip .w3-padding-16", [
						span('.w3-text .w3-tag', {style: 'position:absolute;right:20px;bottom:38px; z-index:12;'}, 'edit'),
						i({
								className: "material-icons w3-text-teal w3-button",
								onClick: () => send.onTodoEditClick(id)
							}, "mode_edit")
					]),
					span(".w3-tooltip .w3-padding-16", [
						span('.w3-text .w3-tag', {style: 'position:absolute;right:20px;bottom:38px; z-index:12;'}, 'enable/disable'),
						i({
								className: "material-icons w3-text-teal w3-button",
								onClick: () => send.onTodoToggleEnableClick(id)
							}, (enabled ? "check_box": "check_box_outline_blank"))
					]),
					span(".w3-tooltip", [
						span('.w3-text .w3-tag', {style: 'position:absolute;right:0;bottom:28px; z-index:12;'}, 'delete toltip'),
						span({
									className: "w3-button w3-red",
									onClick: () => send.onTodoDeleteClick(id)
								}, [ "\u00D7" ])
					]),
				]),
				div('.w3-rest .w3-container', [
				html.input({
					className: 'w3-input',
					type: 'text',
					value: title,
					/**
					* edit mode control this input visibility
					*/
					style: 'display: ' + (editMode ? 'block;':'none;'),
					/**
					* **ref** set input1 value to the html dom node to be use later
					*/
					ref: (node: HTMLInputElement) => { this.input1 = node; },
					/**
					* enter in edit mode
					*/
					onKeyPress: (event: KeyboardEvent) => {
					  if(event.key == 'Enter'){
							event.preventDefault();
							if (!this.input1.value.trim()) { return }
							send.onSaveTodoEnter(id, this.input1.value);
					  }
					},
					/**
					* toggle edit mode
					*/
					onKeyDown: (event: KeyboardEvent) => {
						switch(event.key) {
							case 'Escape':
							case 'Esc':
								send.onTodoEditClick(id)
								break;
						}
					}
				}),
				div({
					/**
					* [classNames](https://github.com/JedWatson/classnames) is a small
					* useful library to easy control class assignment
					*/
					className: classNames('todo' , { completed: completed, enabled: enabled, disabled: !enabled}),
					style: 'display: ' + (!editMode ? 'block;':'none;'),
					onClick: () => send.onTodoClick(id),
				}, [title])
			])
		]);
	}
}
export default Todo;
