import Layout from '../common/Layout';
import Popup from '../common/Popup';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
import { fetchFlickr } from '../../redux/flickrSlice';

function Flickr() {
	const pics = useSelector((store) => store.flickr.data);
	const dispatch = useDispatch();
	const frame = useRef(null);
	const input = useRef(null);
	const pop = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [EnableClick, setEnableClick] = useState(true);
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

	useEffect(() => {
		dispatch(fetchFlickr(Opt));
	}, [Opt]);

	useEffect(() => {
		endLoading();
	}, [pics]);

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
						{pics.map((item, idx) => {
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
				{pics.length !== 0 && (
					<img
						src={`https://live.staticflickr.com/${pics[Index].server}/${pics[Index].id}_${pics[Index].secret}_b.jpg`}
						alt={pics[Index].title}
					/>
				)}
			</Popup>
		</>
	);
}

export default Flickr;
