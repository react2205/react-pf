import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';

function Flickr() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
	//Opt값에 처음 api인수로 전달될 값으로 초기화
	const [Opt, setOpt] = useState(null);
	const masonryOptions = { transitionDuration: '0.5s' };

	const endLoading = () => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
			setTimeout(() => setEnableClick(true), 1000);
		}, 1000);
	};

	const showInterest = () => {
		if (!EnableClick) return;
		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'interest', count: 50 });
	};

	const showSearch = () => {
		if (!EnableClick) return;
		const tag = input.current.value.trim();
		input.current.value = '';
		if (!tag) return alert('검색어를 입력하세요');

		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'search', count: 50, tags: tag });
	};

	const showUser = (e) => {
		if (!EnableClick) return;
		const user = e.target.innerText;

		setLoading(true);
		frame.current.classList.remove('on');
		setOpt({ type: 'user', count: 50, user: user });
	};

	//Opt값이 변경될때마다 해당 값을 FLICKR_START타입의 액션객체에 담아서 saga.js로 전달
	useEffect(() => {
		dispatch({ type: 'FLICKR_START', Opt });
	}, [Opt]);

	//flickr데이터가 변경되면 endLoading을 호출해
	//로딩바 제거하고 컴포넌트 frame출력
	useEffect(() => {
		endLoading();
	}, [flickr]);

	return (
		<>
			<Layout name={'Flickr'}>
				<button onClick={showInterest}>Show Interest</button>
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
				{Loading && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
					/>
				)}
				<div className='frame' ref={frame}>
					<Masonry elementType={'div'} options={masonryOptions}>
						{flickr.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												pop.current.open();
											}}>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => {
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Popup ref={pop}>
				{flickr.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${flickr[Index].server}/${flickr[Index].id}_${flickr[Index].secret}_b.jpg`}
						alt={flickr[Index].title}
					/>
				)}
			</Popup>
		</>
	);
}

export default Flickr;
