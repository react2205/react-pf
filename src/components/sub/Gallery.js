import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function Gallery() {
	const frame = useRef(null);

	const [Items, setItems] = useState([]);

	const getFlickr = async () => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const num = 500;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${num}&nojsoncallback=1&format=json`;

		await axios.get(url).then((json) => {
			setItems(json.data.photos.photo);
		});

		frame.current.classList.add('on');
	};

	useEffect(() => {
		getFlickr();
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame' ref={frame}>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img
										src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
										alt=''
									/>
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
