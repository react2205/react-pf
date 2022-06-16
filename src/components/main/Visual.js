import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Visual() {
	const [Num, setNum] = useState(3);

	const setSwiperNum = () => {
		const wid = window.innerWidth;
		wid < 1180 ? setNum(1) : setNum(3);
	};

	useEffect(() => {
		setSwiperNum();
		window.addEventListener('resize', setSwiperNum);
		return () => window.removeEventListener('resize', setSwiperNum);
	}, []);

	return (
		<figure id='visual' className='myScroll'>
			<Swiper
				navigation={true}
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
				spaceBetween={50}
				loop={true}
				slidesPerView={Num}
				centeredSlides={true}>
				<SwiperSlide>
					<div className='inner'>1</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>2</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>3</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>4</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>5</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>6</div>
				</SwiperSlide>
			</Swiper>
		</figure>
	);
}

export default Visual;
