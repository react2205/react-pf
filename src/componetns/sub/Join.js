import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Join() {
	const initVal = {
		userid: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});

	const check = (Val) => {
		const errs = {};

		//userid인증처리
		if (Val.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}

		return errs;
	};

	const handleChange = (e) => {
		//순서2 - 입력하고 있는 input요소의 name, value값을 변수로 비구조화 할당
		const { name, value } = e.target;
		//순서3- 비구조화 할당으로 받은 값을 Val스테이트에 저장
		//이때 객체 리터럴 프로퍼티안에서 name값을 변수로 유지시키기 위해 []감싸줌
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
										//순서4- Val값이 변경될때마다 화면에 출력
										value={Val.userid}
										//순서1: 인풋에 값 입력시
										onChange={handleChange}
									/>
								</td>
							</tr>
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
