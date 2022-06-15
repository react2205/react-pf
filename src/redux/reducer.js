//여러개의 데이터 리듀서를 합쳐주는 함수 import
import { combineReducers } from 'redux';

//초기 상태 데이터 지정
const initMember = {
	members: [
		{
			name: 'Julia',
			position: 'CEO',
			pic: 'member1.jpg',
		},
		{
			name: 'David',
			position: 'Vice President',
			pic: 'member2.jpg',
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg',
		},
		{
			name: 'Paul',
			position: 'Front-end Dev',
			pic: 'member4.jpg',
		},
		{
			name: 'Julia',
			position: 'Back-en Dev',
			pic: 'member5.jpg',
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg',
		},
	],
};

//각 리듀서 함수의 첫번째 인수: 관리할 데이터, 두번째 인수: 변경할 데이터 (action객체로 전달받은)
//액션: 리듀서로 하여금 기존 state값을 변경하게 해주는 특별한 형태의 객체
//{type: '액션타입', payload: '변경할데이터'}
const memberReducer = (state = initMember, action) => {
	//액션타입에 따라 state값을 다르게 가공
	switch (action.type) {
		//액션타입이 SET_MEMBERS이면 action.payload로 전달받은 데이터로 변경해서 반환
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };

		//그렇지 않으면 기본상태값 반환
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'YOUTUBE_START':
			return { ...state };

		case 'YOUTUBE_SUCCESS':
			return { ...state, youtube: action.payload };

		case 'YOUTUBE_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

const flickrReducer = (state = { flickr: [] }, action) => {
	switch (action.type) {
		case 'FLICKR_START':
			return { ...state };

		case 'FLICKR_SUCCESS':
			return { ...state, flickr: action.payload };

		case 'FLICKR_ERROR':
			return { ...state, error: action.payload };

		default:
			return state;
	}
};

//각 리듀서 데이터객체를 하나로 합쳐서 내보냄
const reducers = combineReducers({
	memberReducer,
	youtubeReducer,
	flickrReducer,
});
export default reducers;
