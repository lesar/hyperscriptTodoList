import { connect } from 'inferno-redux';
import { setVisibilityFilter } from './todos/todo/actions';
import { Link } from './link';
import { IState, IFilter } from './app';

/**
 * mapStateToProps: questa funzione permette di aggiornare automaticamente
 * un componente una volta cambiato lo store: appena lo store cambia chiama
 * questa funzione passandogli lo stato. tramite lo stato viene calcolato un
 * nuovo oggeto di proprietà che viene fuso con le proprietà del componente
 * ownProps: proprietà attuali del componente
 * state: stato attuale
 *
 * rende un oggetto piatto che verrà fuso tramite merge con le
 * proprietà del componente. questo oggetto viene spesso chiamato selector
 * e viene spesso usata reselect per integrare questo dato:
 * https://github.com/reactjs/reselect
 */
const mapStateToProps = (state: IState) => ({
  filter: state.visibilityFilter
});

/**
 * se è un oggetto: ogni metodo è considerato un creatore di azioni redux
 * racchiuso in una chiamata dispach. L'oggetto verrà fuso con le proprietà
 * del componente.
 * se è una funzione: devi usare il dispach fornito e le proprietà per formare
 * un nuovo metodo che verrà fuso con le proprietà del componente
 */
const mapDispatchToProps = (dispatch: any) => ({
  onClick: (filter: IFilter) => {
    dispatch(setVisibilityFilter(filter))
  }
});

/**
 * FilterLink è un nuovo oggetto di tipo Link ma collegato ai cambiamenti dello store
 */
const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink;
