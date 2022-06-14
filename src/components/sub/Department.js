import Layout from '../common/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { setMembers } from '../../redux/action';

function Department() {
	const dispatch = useDispatch();
	const path = process.env.PUBLIC_URL;
	const Members = useSelector((store) => store.memberReducer.members);

	return (
		<Layout name={'Department'}>
			<div className='wrap'>
				<button
					onClick={() => {
						const newMembers = [...Members];
						newMembers[0].name = 'Emma';
						dispatch(setMembers(newMembers));
					}}>
					변경
				</button>
				<br />

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
