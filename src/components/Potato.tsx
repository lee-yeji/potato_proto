import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FaArrowCircleLeft, FaDownload } from 'react-icons/fa';

import ControlItem from './ControlItem';
import Canvas from './Canvas';

import { Image as KonvaImage } from 'konva/types/shapes/Image';
import './Potato.scss';


function Potato() {
	const [sceneState, setSceneState] = useState(1);
	const [bodyState, setBodyState] = useState(1);
	const [mouthState, setMouthState] = useState(1);
	const [eyeState, setEyeState] = useState(1);
	const [accessoryState, setAccessoryState] = useState(1);

	const downloadClicked = () => {
		async function downloadhandler() {

			const scene = Canvas.loadImage(`/images/png/scene/${sceneState}.png`);
			const body = Canvas.loadImage(`/images/png/body/${bodyState}.png`);
			const mouth = Canvas.loadImage(`/images/png/mouth/${mouthState}.png`);
			const eye = Canvas.loadImage(`/images/png/eye/${eyeState}.png`);
			const accessory = Canvas.loadImage(`/images/png/accessory/${accessoryState}.png`);

			// 이미지 그리기. 병렬처리로 이미지를 받아오고 그릴때는 순서대로 그려줘야 한다.
			Promise.all([scene, body, mouth, eye, accessory]).then((images: Array<KonvaImage>) => {
				const canvas = new Canvas();
				canvas.drawImage(images[0]);
				canvas.drawImage(images[1]);
				canvas.drawImage(images[2]);
				canvas.drawImage(images[3]);
				canvas.drawImage(images[4]);
				canvas.downloadAsPng();
			});

		}

		downloadhandler();
	}

	return (
		<main className="potato container">
			<ul className="controls--page clearfix">
				<li className="controls--page__row controls--page__back">
					<Link to="/" className="potato__backlink">
						<FaArrowCircleLeft className="controls--page__row__icon" />
					</Link>
				</li>
				<li className="controls--page__row controls--page__down">
					<button onClick={downloadClicked}>
						<FaDownload className="controls--page__row__icon" />
					</button>
				</li>
			</ul>
			<div id="canvas" className="hidden"></div>
			<div className="canvasView">
				<object className="canvasView__item canvasView__scene" type="image/svg+xml"
					data={`/images/svg/scene/${sceneState}.svg`}>배경</object>
				<object className="canvasView__item canvasView__body" type="image/svg+xml" data={`/images/svg/body/${bodyState}.svg`}>몸통</object>
				<object className="canvasView__item canvasView__mouth" type="image/svg+xml"
					data={`/images/svg/mouth/${mouthState}.svg`}>입술</object>
				<object className="canvasView__item canvasView__eye" type="image/svg+xml" data={`/images/svg/eye/${eyeState}.svg`}>눈</object>
				<object className="canvasView__item canvasView__accessory" type="image/svg+xml"
					data={`/images/svg/accessory/${accessoryState}.svg`}>소품</object>
			</div>
			<ul className="controls--canvas">
				<ControlItem title="배경" state={sceneState} maxState={3} setState={setSceneState} />
				<ControlItem title="몸통" state={bodyState} maxState={1} setState={setBodyState} />
				<ControlItem title="입" state={mouthState} maxState={10} setState={setMouthState} />
				<ControlItem title="눈" state={eyeState} maxState={15} setState={setEyeState} />
				<ControlItem title="소품" state={accessoryState} maxState={3} setState={setAccessoryState} />
			</ul>
		</main>
	);
}

export default Potato;
