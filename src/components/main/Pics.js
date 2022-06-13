function Pics({ Scrolled, start, base }) {
	const position = Scrolled - start - base;

	return (
		<section id='pic' className='myScroll'>
			<p
				style={{
					left: 100 + position,
				}}>
				FLICKR
			</p>
		</section>
	);
}

export default Pics;
