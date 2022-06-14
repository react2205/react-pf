import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Popup from '../common/Popup';
import { setYoutube } from '../../redux/action';
import { useSelector, useDispatch } from 'react-redux';

function Youtube() {
	const pop = useRef(null);
	const dispatch = useDispatch();
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const [Index, setIndex] = useState(0);

	const handlePopup = (index) => {
		pop.current.open();
		setIndex(index);
	};

	const fetchYoutube = async () => {
		const key = 'AIzaSyC77Pd__ju0Wqx_Umc-IuW7Cn2mWi_HVsk';
		const playlist = 'PLHtvRFLN5v-W-izd7V4JH2L4-RTW0WRi3';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		await axios.get(url).then((json) => {
			//해당 컴포넌트에서 axios로 받아진 비동기 데이터를 지역state에 저장하는게 아닌
			//action.js에서 가지고온 setYoutube 액션 생성함수에 인수로 전달
			//setYoutbue는 다음과 같은 액션 객체 반환
			//{type: 'SET_YOUTUBE', payload: json.data.items}
			const action = setYoutube(json.data.items);
			//액션생성함수로 만들어진 action객체를 dispatch로 리듀서에 전달
			dispatch(action);
			//dispatch(setYoutube(json.data.items))
		});
	};

	useEffect(fetchYoutube, []);

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
