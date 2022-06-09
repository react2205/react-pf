import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: null,
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});

	const check = (Val) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[!@#$%^&*()_+]/;

		//userid인증처리
		if (Val.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		//password인증처리
		if (
			Val.pwd1.length < 5 ||
			!eng.test(Val.pwd1) ||
			!num.test(Val.pwd1) ||
			!spc.test(Val.pwd1)
		) {
			errs.pwd1 =
				'비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (Val.pwd1 !== Val.pwd2 || !Val.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if (Val.email.length < 8 || !/@/.test(Val.email)) {
			errs.email =
				'이메일은 8글자이상 @를 포함해 입력하세요';
		}
		if (!Val.gender) {
			errs.gender = '성별을 선택하세요';
		}
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name } = e.target;
		const isCheck = e.target.checked;
		setVal({ ...Val, [name]: isCheck });
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
					<legend className='h'>회원가입 폼 양식</legend>
					<table>
						<caption className='h'>
							회원가입 정보입력
						</caption>
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
									<span className='err'>{Err.userid}</span>
								</td>
							</tr>

							{/* password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd1'
										id='pwd1'
										placeholder='비밀번호를 입력하세요'
										value={Val.pwd1}
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd1}</span>
								</td>
							</tr>
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input
										type='password'
										name='pwd2'
										id='pwd2'
										placeholder='비밀번호를 재입력하세요'
										value={Val.pwd2}
										onChange={handleChange}
									/>
									<span className='err'>{Err.pwd2}</span>
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
									<span className='err'>{Err.email}</span>
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th scope='row'>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input
										type='radio'
										id='male'
										name='gender'
										onChange={handleRadio}
									/>

									<label htmlFor='female'>Female</label>
									<input
										type='radio'
										id='female'
										name='gender'
										onChange={handleRadio}
									/>
									<span className='err'>{Err.gender}</span>
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
