import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
		email: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});

	const check = (Val) => {
		const errs = {};
		//userid인증처리
		if (Val.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		//email인증처리
		if (Val.email.length < 8 || !/@/.test(Val.email)) {
			errs.email =
				'이메일은 8글자이상 @를 포함해 입력하세요';
		}
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};

	useEffect(() => {
		console.log(Err);
	}, [Err]);

	return (
		<Layout name={'Join'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend>회원가입 폼 양식</legend>
					<table border='1'>
						<caption>회원가입 정보입력</caption>
						<tbody>
							{/* userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										placeholder='아이디를 입력하세요.'
										value={Val.userid}
										onChange={handleChange}
									/>
								</td>
							</tr>

							{/* email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>E-MAIL</label>
								</th>
								<td>
									<input
										type='text'
										id='emial'
										name='email'
										placeholder='이메일주소를 입력하세요'
										value={Val.email}
										onChange={handleChange}
									/>
								</td>
							</tr>

							{/* btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='CANCEL' />
									<input type='submit' value='SUBMIT' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Join;
