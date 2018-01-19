import html from '../../infernoHyperscript';
const { div, span, i } = html;
import classNames from 'classnames';
import Component from 'inferno-component';
import { IState } from '../../app';
import './todo.css';

export interface ITodo {
	id: number;
	title: string;
	completed: boolean;
	enabled: boolean;
	editMode: boolean;
};
interface ITodoParams extends ITodo {
	onTodoClick(id: number): void;
	onTodoEditClick(id: number): void;
	onTodoDeleteClick(id: number): void;
	onTodoToggleEnableClick(id: number): void;
	onSaveTodoEnter(e: Event, id: number, input1: HTMLInputElement):void;
};

class Todo extends Component<ITodoParams, IState> {
	private input1: HTMLInputElement;

	constructor(props: ITodoParams) {
    super(props);
	}
	onComponentShouldUpdate(lastProps: ITodo, nextProps: ITodo):boolean {
		return !(lastProps.id == nextProps.id &&
			lastProps.title == nextProps.title &&
			lastProps.enabled == nextProps.enabled &&
			lastProps.editMode == nextProps.editMode &&
			lastProps.completed == nextProps.completed);
	}
	componentDidUpdate() {
		if ( this.input1 ) {
			this.input1.focus();
		}
	}
	render() {
		const { id, title, completed, enabled, editMode, onTodoClick, onTodoDeleteClick, onTodoToggleEnableClick, onTodoEditClick, onSaveTodoEnter }: ITodoParams = this.props;
		return div({
				id,
				className: "w3-hover-sand w3-row-padding w3-border-grey w3-border-bottom",
			}, [
				div('.w3-col .w3-right w3-container', {style: 'width: 180px;'}, [
					span(".w3-tooltip .w3-padding-16", [
						span('.w3-text .w3-tag', {style: 'position:absolute;right:20px;bottom:38px; z-index:12;'}, 'edit'),
						i({
								className: "material-icons w3-text-teal w3-button",
								onClick: () => onTodoEditClick(id)
							}, "mode_edit")
					]),
					span(".w3-tooltip .w3-padding-16", [
						span('.w3-text .w3-tag', {style: 'position:absolute;right:20px;bottom:38px; z-index:12;'}, 'enable/disable'),
						i({
								className: "material-icons w3-text-teal w3-button",
								onClick: () => onTodoToggleEnableClick(id)
							}, (enabled ? "check_box": "check_box_outline_blank"))
					]),
					span(".w3-tooltip", [
						span('.w3-text .w3-tag', {style: 'position:absolute;right:0;bottom:28px; z-index:12;'}, 'delete toltip'),
						span({
									className: "w3-button w3-red",
									onClick: () => onTodoDeleteClick(id)
								}, [ "\u00D7" ])
					]),
				]),
				div('.w3-rest .w3-container', [
				html.input({
					className: 'w3-input',
					type: 'text',
					value: title,
					style: 'display: ' + (editMode ? 'block;':'none;'),
					ref: (node: HTMLInputElement) => { this.input1 = node; },
					onKeyPress: (event: KeyboardEvent) => {
					  if(event.key == 'Enter'){
							onSaveTodoEnter(event, id, this.input1);
					  }
					},
					onKeyDown: (event: KeyboardEvent) => {
						switch(event.key) {
							case 'Escape':
							case 'Esc':
						    console.log(event.key);
								onTodoEditClick(id)
								break;
						}
					}
				}),
				div({
					className: classNames('todo' , { completed: completed, enabled: enabled, disabled: !enabled}),
					style: 'display: ' + (!editMode ? 'block;':'none;'),
					onClick: () => onTodoClick(id),
				}, [title])
			])
		]);
	}
}
export default Todo;
