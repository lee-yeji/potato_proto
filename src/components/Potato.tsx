import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Canvg from 'canvg';
import { FaArrowCircleLeft, FaDownload } from 'react-icons/fa';
import ControlItem from './ControlItem';

import './Potato.scss';

function Potato() {
	const [sceneState, setSceneState] = useState(1);
	const [bodyState, setBodyState] = useState(1);
	const [mouthState, setMouthState] = useState(1);
	const [eyeState, setEyeState] = useState(1);
	const [accessoryState, setAccessoryState] = useState(1);

	const canvas = useRef<HTMLCanvasElement>(null);
	const canvg = useRef<Canvg | null>(null);

	const downloadAsPng = (canvas: HTMLCanvasElement) => {
		var dataURL = canvas.toDataURL('image/png');
		dataURL = dataURL.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');
		dataURL = dataURL.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png');

		var a = document.createElement('a');
		a.download = 'my_potato.png';
		a.href = dataURL;
		a.click();
	}

	const downloadClicked = () => {
		async function render(ctx: CanvasRenderingContext2D, url: string) {
			if (canvg) {
				canvg.current = await Canvg.from(ctx, url, {
					ignoreClear: true,
					ignoreMouse: true,
					ignoreDimensions: true
				});
				canvg.current.start();
			}
		}

		async function renderCanvas(ctx: CanvasRenderingContext2D) {
			await render(ctx, `/images/svg/scene/${sceneState}.svg`);
			await render(ctx, `/images/svg/body/${bodyState}.svg`);
			await render(ctx, `/images/svg/mouth/${mouthState}.svg`);
			await render(ctx, `/images/svg/eye/${eyeState}.svg`);
			await render(ctx, `/images/svg/accessory/${accessoryState}.svg`);
		}

		async function downloadhandler(ctx: CanvasRenderingContext2D | null) {
			if (ctx) {
				await renderCanvas(ctx);
				if (canvas && canvas.current) {
					downloadAsPng(canvas.current);
				}
			}
		}

		const ctx: CanvasRenderingContext2D | null = canvas.current ? canvas.current.getContext('2d') : null;
		downloadhandler(ctx);
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
			<canvas id="canvas" width="400" height="400" ref={canvas} className="hidden" />
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
