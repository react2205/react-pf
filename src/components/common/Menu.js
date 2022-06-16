import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

function Menu() {
	const [Open, setOpen] = useState(true);
	const active = { color: 'aqua' };

	return (
		<AnimatePresence>
			{Open && (
				<nav id='mobileGnb'>
					<h1>
						<NavLink exact to='/'>
							DCODELAB
						</NavLink>
					</h1>

					<ul>
						<li>
							<NavLink to='/department' activeStyle={active}>
								DEPARTMENT
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								COMMUNITY
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								GALLERY
							</NavLink>
						</li>
						<li>
							<NavLink to='/flickr' activeStyle={active}>
								FLICKR
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								YOUTUBE
							</NavLink>
						</li>
						<li>
							<NavLink to='/join' activeStyle={active}>
								JOIN
							</NavLink>
						</li>
					</ul>
				</nav>
			)}
		</AnimatePresence>
	);
}

export default Menu;
