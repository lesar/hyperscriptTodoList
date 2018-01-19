import Footer from './footer';
import { AddTodo } from './todos/todo/addTodo';
import  VisibleTodoList from './todos/visibleToDoList';
import Component from 'inferno-component';
import { html, h } from './infernoHyperscript';
import { ITodo } from './todos/todo/todo';

export enum CompletedFilter {
	All=1,
	Completed,
	Uncompleted,
}
export enum EnabledFilter {
	All=1,
	Enabled,
	Disabled,
}
export interface IFilter {
	completed: CompletedFilter;
	enabled: EnabledFilter;
}
export interface IState {
	todos: ITodo[];
	visibilityFilter: IFilter;
}
export interface IStoreParam {
	store: any;
}

export var filterAll: IFilter={
	completed: CompletedFilter.All,
	enabled: EnabledFilter.All
};
export class App extends Component<any, IState> {
	constructor(props: any) {
    super(props);
	}
	render() {
		return html.div([
			h(AddTodo),
			h(VisibleTodoList),
			h(Footer)
		]);
	}

}

export default App;
