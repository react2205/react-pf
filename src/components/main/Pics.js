import { useSelector } from 'react-redux';

function Pics({ Scrolled, start, base }) {
	const { flickr } = useSelector((store) => store.flickrReducer);
	let position = 0;
	if (start) position = Scrolled - start - base;

	return (
		<section id='pic' className='myScroll'>
			<p style={{ left: 100 + position }}>FLICKR</p>
			<h3 style={{ left: 100 + position / 2 }}>FLICKR</h3>

			{flickr.map((item, idx) => {
				if (idx < 5) {
					return (
						<div className='pic'>
							<img
								src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
								alt={item.title}
							/>
						</div>
					);
				}
			})}
		</section>
	);
}

export default Pics;
