/**
* This is the root file for the exemple HyperscriptTodoList.
* In this file I use a little of RamdaJs only to introduce this library:
* I will like to write a new HyperscriptTodoList example in functional way next time
*/
import Inferno from 'inferno';
import { createStore } from 'redux';
import { Provider } from 'inferno-redux';
import todoAppReducer from './todos/todo/reducers'
import { h } from './infernoHyperscript';
/**
* I do not import all RamdaJs (import * as R from "ramda";) only partialRight
*/
import { partialRight } from "ramda";
import App from './app';

/**
* take Inferno.render and give to it document.getElementById('root') as last parameter
* returning a function that need only the component param
*/
const render = partialRight(
  Inferno.render,
  [ document.getElementById('root') ]
);
/**
* In Redux only one store adn one state are used.
* The store encapsulate state. Store is create taking a reducer function
* **todoAppReducer** that take (state, action) to calculate a
* new application state.
* Only the reducer function can generate a new state: the state cannot
* be manually changed.
* store.dispach(Action) call reducer function to calculate the new state by
* the action and the last state. The new state is encapsulate by the store.
* Store.getState() will return the actual state.
*/
const store = createStore( todoAppReducer );
/**
* App is the root Application component: all other component are App childs.
* Provider is a special component that provides to all application component
* the store in context property: all component can access to this.context.store.
* To do his job Provider need the store and the root component App.
* All component instance must be create by **h** hyperscript function
*/
const provider = h(Provider, {store: store, children: h(App)});
/**
* provider take App place as root component.
* render show the application.
*/
render(provider);
