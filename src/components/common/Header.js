import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import Menu from './Menu';

function Header({ type }) {
	const menu = useRef(null);
	const style = { color: 'hotpink' };

	return (
		<>
			<header className={type}>
				<div className='inner'>
					<h1>
						<Link to='/'>DCODELAB</Link>
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
							<NavLink activeStyle={style} to='/flickr'>
								FLICKR
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

					<FontAwesomeIcon
						icon={faBars}
						onClick={() => menu.current.toggle()}
					/>
				</div>
			</header>

			<Menu ref={menu} />
		</>
	);
}

export default Header;
