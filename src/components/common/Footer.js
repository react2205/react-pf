import { useSelector } from 'react-redux';

function Footer() {
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<footer>
			<div className='inner'>
				<p>2022 DCODLEAB &copy; ALL RIGHTS RESERVED.</p>
				<div>
					{Members.map((member, idx) => (
						<img
							key={idx}
							src={`${process.env.PUBLIC_URL}/img/${member.pic}`}
						/>
					))}
				</div>
			</div>
		</footer>
	);
}

export default Footer;
