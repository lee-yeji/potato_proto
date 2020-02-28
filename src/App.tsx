import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home';
import Potato from './components/Potato';

import './App.scss';

function App() {
	return (
		<div className="App">
			<Route path="/" component={Home} exact={true} />
			<Route path="/potato" component={Potato} />
		</div>
	);
}

export default App;
