import { useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: 'aqua' };

	useImperativeHandle(ref, () => {
		return {
			toggle: () => setOpen(!Open),
		};
	});

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobileGnb'
					initial={{ x: -320, opacity: 0 }}
					animate={{
						x: 0,
						opacity: 1,
						transition: { duration: 0.5 /*type: 'spring', stiffness: 100*/ },
					}}
					exit={{ x: -320, opacity: 0 }}
					onClick={() => setOpen(!Open)}>
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
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
