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
		const method_user = 'flickr.people.getPhotos';
		let url = '';

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${key}&per_page=${opt.count}&nojsoncallback=1&format=json&user_id=${opt.user}`;
		}

		await axios.get(url).then((json) => {
			//만약 검색 결과가 없다면 경고창 띄우고 종료
			if (json.data.photos.photo.length === 0)
				return alert('해당검색어의 결과이미자 없습니다.');
			setItems(json.data.photos.photo);
			console.log(json.data.photos.photo);
		});

		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);

			setTimeout(() => {
				setEnableClick(true);
			}, 2000); //frame요소의 transition시간까지 지연
		}, 1000); //데이터준비 완료될때까지 지연
	};

	const showSearch = () => {
		const result = input.current.value.trim();

		input.current.value = '';
		if (!result) return alert('검색어를 입력하세요');

		if (EnableClick) {
			setEnableClick(false);
			setLoading(true);
			frame.current.classList.remove('on');
			getFlickr({
				type: 'search',
				count: 50,
				tags: result,
			});
		}
	};

	useEffect(() => {
		getFlickr({
			type: 'interest',
			count: 50,
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
			{/* 미션 - 각 패널에 유저이미지와 아이디 출력하고 클릭시 해당 사용자의 이미지만 다시 출력 */}
			<div className='searchBox'>
				<input
					type='text'
					ref={input}
					placeholder='검색어를 입력하세요'
					onKeyUp={(e) => {
						if (e.key === 'Enter') showSearch();
					}}
				/>
				<button onClick={showSearch}>SEARCH</button>
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
									<div className='profile'>
										<img
											src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
											alt={item.owner}
											onError={(e) => {
												//해당 이미지요소의 소스이미지가 없어서 onError이벤트가 발생하면 src값을 대체이미지로 변경
												e.target.setAttribute(
													'src',
													'https://www.flickr.com/images/buddyicon.gif'
												);
											}}
										/>
										<span
											onClick={(e) => {
												if (EnableClick) {
													setEnableClick(false);
													setLoading(true);
													frame.current.classList.remove('on');

													getFlickr({
														type: 'user',
														count: 50,
														user: e.currentTarget.innerText,
													});
												}
											}}>
											{item.owner}
										</span>
									</div>
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
