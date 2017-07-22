import { h, render } from 'preact';

let root;
function init() {
	let App = require('./components/app').default;
	root = render(<App />, document.body, root);
}
init();