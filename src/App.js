import { Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
//main
import Main from './components/main/Main';
//sub
import Department from './components/sub/Department';
import Flickr from './components/sub/Flickr';
import Community from './components/sub/Community';
import Youtube from './components/sub/Youtube';
import Location from './components/sub/Location';
import Join from './components/sub/Join';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as types from './redux/actionType';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: types.FLICKR.start,
			Opt: { type: 'user', count: 50, user: '164021883@N04' },
		});
		dispatch({ type: types.YOUTUBE.start });
		dispatch({ type: types.MEMBER.start });
	}, []);

	return (
		<>
			<Switch>
				<Route exact path='/' component={Main} />
				<Route path='/' render={() => <Header type={'sub'} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/flickr' component={Flickr} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/location' component={Location} />
			<Route path='/join' component={Join} />

			<Footer />
		</>
	);
}

export default App;
