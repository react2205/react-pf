import axios from 'axios';

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

	await axios.get(url);
};

/*
  redux로 관리되는 파일들은 컴포넌트 외부에서 전역으로 동작하기 때문에 부수효과를 발생시키지 않는 순수함수 형태로 제작
  부수효과 (SideEffect) : DOM이나 컴포넌트가 제어해야 되는 화면의 변경점을 야기시키는 효과
  순수함수 (Pure Function) : 부수효과를 발생시키지 않는 함수
*/
