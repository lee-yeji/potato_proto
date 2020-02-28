import React from 'react';

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

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
		const nextState = state % maxState + 1;
		setState(nextState);
	};

	const decreaseState = () => {
		const nextState = state - 1;
		if (nextState) {
			setState(nextState);
		} else {
			setState(maxState);
		}
	};

	return (
		<li className="controls--canvas__row controls--canvas__scene">
			<span className="controls--canvas__row__title">{title}</span>
			<button className="controls--canvas__row__leftbutton" onClick={decreaseState}>
				<FaAngleLeft />
			</button>
			<span className="controls--canvas__row__number">{state}</span>
			<button className="controls--canvas__row__rightbutton" onClick={increaseState}>
				<FaAngleRight />
			</button>
		</li>
	);
}

export default ControlItem;
