import { NavLink } from 'react-router-dom';

function Header() {
	const style = { color: 'hotpink' };
	return (
		<header>
			<h1>
				<NavLink activeStyle={style} to='/'>
					DCODELAB
				</NavLink>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink activeStyle={style} to='/department'>
						DEPARTMENT
					</NavLink>
				</li>
				<li>
					<NavLink activeStyle={style} to='/community'>
						COMMUNITY
					</NavLink>
				</li>
				<li>
					<NavLink activeStyle={style} to='/gallery'>
						GALLERY
					</NavLink>
				</li>
				<li>
					<NavLink activeStyle={style} to='/youtube'>
						YOUTUBE
					</NavLink>
				</li>
				<li>
					<NavLink activeStyle={style} to='/location'>
						LOCATION
					</NavLink>
				</li>
				<li>
					<NavLink activeStyle={style} to='/join'>
						JOIN
					</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
