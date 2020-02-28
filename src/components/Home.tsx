import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

function Home() {
	return (
		<main className="front container">
			<Link to="potato" id="front__enterlink" className="front__enterlink hidden_text">
				Potato
			</Link>
			<label htmlFor="front__enterlink" className="typo_content_title front__enterlink_label">
				눌러주세요
			</label>
		</main>
	);
}

export default Home;
