import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const masonryOptions = { transitionDuration: '0.5s' };

	const key = '4612601b324a2fe5a1f5f7402bf8d87a';
	const method_interest = 'flickr.interestingness.getList';
	const method_search = 'flickr.photos.search';
	const num = 500;
	const interest_url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${num}&nojsoncallback=1&format=json`;
	const search_url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${num}&nojsoncallback=1&format=json&tags=ocean`;

	const getFlickr = async (url) => {
		await axios.get(url).then((json) => {
			setItems(json.data.photos.photo);
		});

		frame.current.classList.add('on');
	};

	useEffect(() => {
		getFlickr(interest_url);
	}, []);

	return (
		<Layout name={'Gallery'}>
			<button
				onClick={() => {
					frame.current.classList.remove('on');
					getFlickr(interest_url);
				}}>
				Interest Gallery
			</button>
			<button
				onClick={() => {
					frame.current.classList.remove('on');
					getFlickr(search_url);
				}}>
				Search Gallery
			</button>

			<div className='frame' ref={frame}>
				<Masonry elementType={'div'} options={masonryOptions}>
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
				</Masonry>
			</div>
		</Layout>
	);
}

export default Gallery;
