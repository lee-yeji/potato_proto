import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Konva from 'konva';
import * as FileSaver from 'file-saver';
import { FaArrowCircleLeft, FaDownload } from 'react-icons/fa';

import ControlItem from './ControlItem';
import './Potato.scss';
import { Image as KonvaImage } from 'konva/types/shapes/Image';
import { Layer as KonvaLayer } from 'konva/types/Layer';

function Potato() {
	const [sceneState, setSceneState] = useState(1);
	const [bodyState, setBodyState] = useState(1);
	const [mouthState, setMouthState] = useState(1);
	const [eyeState, setEyeState] = useState(1);
	const [accessoryState, setAccessoryState] = useState(1);

	const triggerDownload = (blob: Blob) => {
		FileSaver.saveAs(blob, 'my_potato.png');
	};

	const downloadAsPng = (canvas: HTMLCanvasElement) => {
		canvas.toBlob(imageBlob => {
			if (imageBlob) {
				triggerDownload(imageBlob);
			}
		});
	};

	const downloadClicked = () => {
		const loadImage = (src: string) => {
			return new Promise<KonvaImage>((resolve, reject) => {
				Konva.Image.fromURL(src, (image: KonvaImage) => {
					resolve(image);
				});
			});
		}

		const drawNode = (layer: KonvaLayer, image: KonvaImage) => {
			image.setAttrs({
				x: 0,
				y: 0,
				width: 400,
				height: 400
			});
			layer.add(image);
			layer.batchDraw();
		};

		async function renderCanvas() {
			var stage = new Konva.Stage({
				container: 'canvas',
				width: 400,
				height: 400
			});

			var layer = new Konva.Layer();
			stage.add(layer);

			const sceneNode = await loadImage(`/images/png/scene/${sceneState}.png`);
			const bodyNode = await loadImage(`/images/png/body/${bodyState}.png`);
			const mouthNode = await loadImage(`/images/png/mouth/${mouthState}.png`);
			const eyeNode = await loadImage(`/images/png/eye/${eyeState}.png`);
			const accessoryNode = await loadImage(`/images/png/accessory/${accessoryState}.png`);

			drawNode(layer, sceneNode);
			drawNode(layer, bodyNode);
			drawNode(layer, mouthNode);
			drawNode(layer, eyeNode);
			drawNode(layer, accessoryNode);

			return layer.toCanvas({});
		}

		async function downloadhandler() {
			const canvas = await renderCanvas();
			downloadAsPng(canvas);
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
