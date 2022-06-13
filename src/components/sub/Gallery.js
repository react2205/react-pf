import Layout from '../common/Layout';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	const masonryOptions = { transitionDuration: '0.5s' };

	const getFlickr = async (opt) => {
		const key = '4612601b324a2fe5a1f5f7402bf8d87a';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

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
		getFlickr({
			type: 'interest',
			count: 500,
		});
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
						getFlickr({
							type: 'interest',
							count: 500,
						});
					}
				}}>
				Interest Gallery
			</button>

			<div className='searchBox'>
				<input type='text' ref={input} placeholder='검색어를 입력하세요' />
				<button
					onClick={() => {
						const result = input.current.value;
						input.current.value = '';

						if (EnableClick) {
							setEnableClick(false);
							setLoading(true);
							frame.current.classList.remove('on');
							getFlickr({
								type: 'search',
								count: 500,
								tags: result,
							});
						}
					}}>
					SEARCH
				</button>
			</div>

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
