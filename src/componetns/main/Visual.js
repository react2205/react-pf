import Anime from '../../asset/anim.js';
import { useRef } from 'react';

function Visual() {
	const box = useRef(null);
	const style = {
		width: 100,
		height: 100,
		backgroundColor: 'aqua',
		position: 'absolute',
		top: 200,
		left: 0,
	};
	return (
		<figure id='visual'>
			<div
				ref={box}
				className='box'
				style={style}
				onClick={() => {
					new Anime(window, {
						prop: 'scroll',
						value: 1000,
						duration: 500,
					});
				}}></div>
		</figure>
	);
}

export default Visual;
