import React from 'react';

import './Potato.scss';

function ControlItem({
	title,
	state,
	maxState,
	setState
}: {
	title: string;
	state: number;
	maxState: number;
	setState: React.Dispatch<React.SetStateAction<number>>;
}) {
	const increaseState = () => {
		const nextState = Math.min(state + 1, maxState);
		setState(nextState);
	};

	const decreaseState = () => {
		const nextState = Math.max(state - 1, 1);
		setState(nextState);
	};

	return (
		<li className="controls--canvas__row controls--canvas__scene">
			<span className="controls--canvas__row__title">{title}</span>
			<button className="controls--canvas__row__leftbutton" onClick={decreaseState}>
				<i className="fas fa-chevron-left" />
			</button>
			<span className="controls--canvas__row__number">{state}</span>
			<button className="controls--canvas__row__rightbutton" onClick={increaseState}>
				<i className="fas fa-chevron-right" />
			</button>
		</li>
	);
}

export default ControlItem;
