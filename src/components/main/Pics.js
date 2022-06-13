function Pics({ Scrolled, start, base }) {
	const position = Scrolled - start - base;

	return (
		<section id='pic' className='myScroll'>
			<p style={{ left: 100 + position }}>FLICKR</p>
			<h3 style={{ left: 100 + position / 2 }}>FLICKR</h3>
		</section>
	);
}

export default Pics;
