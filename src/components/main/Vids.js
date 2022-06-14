import { useSelector } from 'react-redux';

function Vids() {
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	return (
		<section id='vids' className='myScroll'>
			{Vids.map((vid, idx) => {
				return (
					<article key={idx}>
						<div className='pic'>
							<img
								src={vid.snippet.thumbnails.standard.url}
								alt={vid.snippet.title}
							/>
						</div>
					</article>
				);
			})}
		</section>
	);
}

export default Vids;
