import Inferno from 'inferno';
//import { InfernoChildren, VNode } from "inferno/core/VNodes";
import { createStore } from 'redux';
import { Provider } from 'inferno-redux';
import todoAppReducer from './todos/todo/reducers'
import { h } from './infernoHyperscript';
//import * as R from "ramda";
import { partial } from "ramda";
import App from './app';

const myrender = (node: any, component: any) => Inferno.render(component, node);
const render = partial(
  myrender,
  [ document.getElementById('root') ]
);
const store = createStore( todoAppReducer );
/**
  passo lo store nelle proprietà in modo che venga memorizzato nella proprietà
  store del Provider e ritornato come proprietà di un oggetto in getChildContext
*/
//let provider = new Provider({store});
//provider.props.children = App;//non ho trovato il modo di crearlo direttamente con il figlio
/*
class ProviderApp extends Provider {
   render(): any {
      //return new App({}).render();
      return h(App);
    }
}
*/
/**
  passo lo store nelle proprietà in modo che venga memorizzato nella proprietà
  store del Provider e ritornato come proprietà di un oggetto in getChildContext.
  children è il nodo componente radice di inferno
  il terzo parametro è il context
*/
//const provider = new ProviderApp({store: store, children: App}, {});
const provider = h(Provider, {store: store, children: h(App)});
/**
  compongo render x provider: provider può essere visto come una funzione che rende
  un componente che tramite composizione viene reso a render appunto
*/
//render(provider.render());
//const main = R.compose(render, provider.render);
//const main = R.pipe(provider.render, render);
//const main = render(provider.render());
//render(provider.render());
render(provider);
//Inferno.render(provider.render(), document.getElementById('root'));//main();
/*
function main() {
  //return alert('ok');
  let root = document.getElementById("root");
  if ( root ) {
    root.innerHTML='ok';
  }
}
main();
*/
