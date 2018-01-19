import { connect } from 'inferno-redux';
import { addTodo } from './actions';
import Component from 'inferno-component';
import html from '../../infernoHyperscript';
import { IState } from '../../app';

const mapDispatchToProps = (dispatch: any) => ({
	onAddTodoClick: (e: Event, input1: HTMLInputElement) => {
		e.preventDefault();
		if (!input1.value.trim()) { return }
    dispatch(addTodo(input1.value));
		input1.value = '';
  }
});

export interface IAddTodoParams {
	onAddTodoClick(e: Event, input1: HTMLInputElement): void;
};

class AddTodoPreBind extends Component<IAddTodoParams, IState> {
	private input1: HTMLInputElement;
	constructor(props: IAddTodoParams) {
    super(props);
	}
	componentDidUpdate() {
		this.input1.focus();
	}
	render() {
		return (
			html.div('.w3-container',[
				html.form(
					{ className: 'w3-container',
						onSubmit: (e: Event) => {
							this.props.onAddTodoClick(e, this.input1);
						}
					}, [
						html.label('.w3-text-indigo .w3-opacity', [html.b('new Todo')]),
						html.input({
							className: 'w3-input',
							autofocus: 'autofocus',
							type: 'text',
							ref: (node: HTMLInputElement) => { this.input1 = node; }
						}),
						html.button( { className: 'w3-btn w3-round-large w3-indigo w3-opacity' , type: 'submit' }, 'Add Todo' )
					]
				)
			])
		)
	}
}


export const AddTodo = connect(null, mapDispatchToProps)(AddTodoPreBind);
export default AddTodo;
