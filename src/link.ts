/**
* Link component set the new state filters
*/
import html from './infernoHyperscript';
import { IState, IFilter, Filter, CompletedFilter, EnabledFilter } from './app';
import Component from 'inferno-component';

/**
* provided params to Link object interface
*/
export interface ILinkParams {
  filter: IFilter;
  onClick: (filter: IFilter) => void;
};

export class Link extends Component<ILinkParams, IState> {
  constructor(props: ILinkParams) {
    super(props);
  }
  /**
  * return a new link using our dispatch interface onClic to dispatch new filter
  * this leaves the enabled filter unchanged
  */
  linkCompleted(filter: IFilter, value: CompletedFilter) {
    return html.a({
      href: "#",
      className: 'w3-bar-item w3-button',
      onClick: (e: Event) => {
        e.preventDefault();
        let newFilter: IFilter = new Filter( value, filter.enabled);
        this.props.filter = newFilter,
        this.props.onClick(newFilter);
      }
    }, CompletedFilter[value]);
  }
  /**
  * return a new link using our dispatch interface onClic to dispatch new filter
  * this leaves the completed filter unchanged
  */
  linkEnabled(filter: IFilter, value: EnabledFilter) {
    return html.a({
      href: "#",
      className: 'w3-bar-item w3-button',
      onClick: (e: Event) => {
        e.preventDefault();
        let newFilter: IFilter = new Filter(filter.completed, value);
        this.props.filter = newFilter,
        this.props.onClick(newFilter);
      }
    }, EnabledFilter[value]);
  }
  render() {
    const { filter }: ILinkParams = this.props;
    return (html.div([
      html.div('.w3-dropdown-hover', [
        html.button('.w3-button', CompletedFilter[filter.completed]),
        html.div('.w3-dropdown-content .w3-bar-block .w3-border', [
          this.linkCompleted(filter, CompletedFilter.All),
          this.linkCompleted(filter, CompletedFilter.Uncompleted),
          this.linkCompleted(filter, CompletedFilter.Completed)
        ])
      ]),
      html.div('.w3-dropdown-hover', [
        html.button('.w3-button', EnabledFilter[filter.enabled]),
        html.div('.w3-dropdown-content .w3-bar-block .w3-border', [
          this.linkEnabled(filter, EnabledFilter.All),
          this.linkEnabled(filter, EnabledFilter.Disabled),
          this.linkEnabled(filter, EnabledFilter.Enabled)
        ])
      ])
    ]));
  }
}
export default Link;
