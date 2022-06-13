import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
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

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);

			setTimeout(() => {
				setEnableClick(true);
			}, 2000); //frame요소의 transition시간까지 지연
		}, 1000); //데이터준비 완료될때까지 지연
	};

	useEffect(() => {
		getFlickr(interest_url);
	}, []);

	return (
		<Layout name={'Gallery'}>
			{Loading && (
				<img
					className='loading'
					src={`${process.env.PUBLIC_URL}/img/loading.gif`}
				/>
			)}
			<button
				onClick={() => {
					if (EnableClick) {
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr(interest_url);
					}
				}}>
				Interest Gallery
			</button>
			<button
				onClick={() => {
					if (EnableClick) {
						setEnableClick(false);
						setLoading(true);
						frame.current.classList.remove('on');
						getFlickr(search_url);
					}
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
