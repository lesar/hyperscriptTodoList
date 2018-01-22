/**
* App component is defined here together some basic interface.
* App component is a container for all application components.
*/
import Footer from './footer';
import { AddTodo } from './todos/todo/addTodo';
import  VisibleTodoList from './todos/visibleToDoList';
import Component from 'inferno-component';
import { html, h } from './infernoHyperscript';
import { ITodo } from './todos/todo/todo';
/**
* enum play filter rule on Completed todos property
*/
export enum CompletedFilter {
	All=1,
	Completed,
	Uncompleted,
}
/**
* enum play filter rule on Enabled todos property
*/
export enum EnabledFilter {
	All=1,
	Enabled,
	Disabled,
}
/**
* Filter interface containig all used filter
*/
export interface IFilter {
	completed: CompletedFilter;
	enabled: EnabledFilter;
}
/**
* State interface. State is the unique global object containig the application state
*/
export interface IState {
	todos: ITodo[];
	visibilityFilter: IFilter;
}

/**
* Initial filter object: all are showed
*/
export var filterAll: IFilter={
	completed: CompletedFilter.All,
	enabled: EnabledFilter.All
};
/**
* all component node have to be instantiated by hyperscript h function
*/
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
