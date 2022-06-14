import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/*
	단계1 - 기존의 컴포넌트 함수를 대입형(화살표) 함수로 변경
	단계2 - 해당 화살표함수를 forwardRef()의 인수로 전달
	단계3 - forwardRef의 인수로 전달받는 함수의 두번채 파라미터로 ref추가
*/

const Popup = forwardRef(({ children }, ref) => {
	//자신의 open여부를 결정하는 state생성
	const [Open, setOpen] = useState(false);

	useEffect(() => {
		Open
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [Open]);

	//해당 컴포넌트에서 만들어지는 함수를 부모컴포넌트에서 사용가능하도록 외부로 반환가능
	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true), //팝업열기 함수
			close: () => setOpen(false), //팝업닫기 함수
		};
	});

	return (
		<>
			<AnimatePresence>
				{Open && (
					<motion.aside
						initial={{ opacity: 0, scale: 0 }}
						animate={{
							opacity: 1,
							scale: 1,
							transition: { duration: 0.5 },
						}}
						exit={{
							opacity: 0,
							x: '-100%',
							transition: { duration: 0.5, delay: 0.8 },
						}}
						className='pop'>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: { duration: 0.5, delay: 0.5 },
							}}
							exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.5 } }}
							className='con'>
							{children}
							<motion.span
								initial={{ opacity: 0, x: 50 }}
								animate={{
									opacity: 1,
									x: 0,
									transition: { duration: 0.5, delay: 1 },
								}}
								exit={{ opacity: 0, x: 50 }}
								className='close'
								onClick={() => setOpen(false)}>
								close
							</motion.span>
						</motion.div>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
});

export default Popup;
