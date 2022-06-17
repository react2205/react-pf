import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';
import Popup from '../common/Popup';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	const [Index, setIndex] = useState(0);
	const pop = useRef(null);

	return (
		<>
			<section id='vids' className='myScroll'>
				{Vids.map((vid, idx) => {
					if (idx < 4) {
						return (
							<article key={idx}>
								<div
									className='pic'
									onClick={() => {
										setIndex(idx);
										pop.current.open();
									}}>
									<img
										src={vid.snippet.thumbnails.standard.url}
										alt={vid.snippet.title}
									/>
								</div>
							</article>
						);
					}
				})}
			</section>

			<Popup ref={pop}>
				<>
					{Vids.length !== 0 && (
						<iframe
							src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
							frameBorder='0'></iframe>
					)}
				</>
			</Popup>
		</>
	);
}

export default Vids;
