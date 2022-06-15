/*
  takeLatest : 액션요청이 여러번 들어오면 제일 최근 요청 하나만 실행 (takeEvery: 들어오는 요청 모두처리)
  all : 여러개의 요청함수를 병렬식으로  동시에 처리
  call : 특정함수를 동기적으로 호출 (api요청시 주로 사용, 두번째 인수값으로 api요청에 필요한 옵션값 전달) 
  fork : saga를 실행함수
  put : 리듀서로 액션객체를 전달 (dispatch)
*/
import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr } from './api';

//컴포넌트에서 받은 인수값을 api.js에 있는 axios함수에 연결하는 함수
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.Opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}

//요청받은 액션타입에 따라 함수호출
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//reducer에 적용될 rootSaga생성함수
export default function* rootSaga() {
	yield all([fork(callFlickr)]);
}
