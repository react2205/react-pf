import Layout from '../common/Layout';
import { useSelector } from 'react-redux';

function Department() {
	const path = process.env.PUBLIC_URL;
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<Layout name={'Department'}>
			<div className='wrap'>
				{Members.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={`${path}/img/${member.pic}`} alt={member.name} />
								</div>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Department;
