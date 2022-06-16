import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useRef, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Visual() {
	const cursor = useRef(null);
	const mouseMove = (e) => {
		cursor.current.style.left = e.clientX + 'px';
		cursor.current.style.top = e.clientY + 'px';
	};

	useEffect(() => {
		window.addEventListener('mousemove', mouseMove);
		return () => window.removeEventListener('mousemove', mouseMove);
	}, []);

	return (
		<figure id='visual' className='myScroll'>
			<Swiper
				navigation={true}
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
				spaceBetween={50}
				loop={true}
				centeredSlides={true}
				breakpoints={{
					// when window width is >= 320px
					320: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					1180: {
						slidesPerView: 3,
						spaceBetween: 40,
					},
				}}>
				{[1, 2, 3, 4, 5, 6].map((num) => {
					return (
						<SwiperSlide
							onMouseEnter={() =>
								(cursor.current.style = ` transform: translate(-50%, -50%)  scale(4) `)
							}
							onMouseLeave={() =>
								(cursor.current.style = ` transform: translate(-50%, -50%)  scale(1) `)
							}>
							<div className='inner'>
								<video
									src={`${process.env.PUBLIC_URL}/img/vid${num}.mp4`}
									muted
									loop
									autoPlay></video>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>

			<div className='cursor' ref={cursor}></div>
		</figure>
	);
}

export default Visual;
