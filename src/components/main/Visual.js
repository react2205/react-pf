import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Visual() {
	return (
		<figure id='visual' className='myScroll'>
			<Swiper
				navigation={true}
				modules={[Navigation, Pagination]}
				pagination={{ clickable: true }}
				spaceBetween={50}
				loop={true}
				slidesPerView={3}
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
