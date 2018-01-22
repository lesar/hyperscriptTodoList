import FilterLink from './filterLinks';
import Component from 'inferno-component';
import { html, h } from './infernoHyperscript';
import { IState } from './app';

class Footer extends Component<any, IState> {
	constructor(props: any) {
    super(props);
	}
	render() {
		return html.div('.w3-bar .w3-teal .w3-container .w3-margin-top',
			[html.div('.w3-bar-item ', "Filter: "),
			 h(FilterLink),
			]
		)
	}
}

export default Footer;
