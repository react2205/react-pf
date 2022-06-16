import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { useEffect, useState, useRef } from 'react';
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
