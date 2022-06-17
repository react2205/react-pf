import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import Popup from '../common/Popup';
import { useSelector } from 'react-redux';

function Youtube() {
	const pop = useRef(null);
	const Vids = useSelector((store) => store.youtube.data);
	const [Index, setIndex] = useState(0);

	const handlePopup = (index) => {
		pop.current.open();
		setIndex(index);
	};

	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((vid, idx) => {
					const tit = vid.snippet.title;
					const desc = vid.snippet.description;
					const date = vid.snippet.publishedAt;

					return (
						<article key={idx}>
							<h3>{tit.length > 50 ? tit.substr(0, 30) + '...' : tit}</h3>
							<div className='txt'>
								<p>{desc.length > 200 ? desc.substr(0, 200) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
							<div className='pic' onClick={() => handlePopup(idx)}>
								<img
									src={vid.snippet.thumbnails.standard.url}
									alt={vid.title}
								/>
							</div>
						</article>
					);
				})}
			</Layout>

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

export default Youtube;
