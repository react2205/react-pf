import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMember } from './api';

//flickr saga
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.Opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//youtube saga
export function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}

//members saga
export function* returnMember() {
	try {
		const response = yield call(fetchMember);
		console.log(response);
		yield put({ type: 'MEMBER_SUCCESS', payload: response.data.members });
	} catch (err) {
		yield put({ type: 'MEMBER_ERROR', payload: err });
	}
}
export function* callMember() {
	yield takeLatest('MEMBER_START', returnMember);
}

export default function* rootSaga() {
	yield all([fork(callFlickr), fork(callYoutube), fork(callMember)]);
}
