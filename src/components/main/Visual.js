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
					<div className='inner'>
						<video
							src={`${process.env.PUBLIC_URL}/img/vid1.mp4`}
							muted
							loop
							autoPlay></video>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>
						<video
							src={`${process.env.PUBLIC_URL}/img/vid2.mp4`}
							muted
							loop
							autoPlay></video>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>
						<video
							src={`${process.env.PUBLIC_URL}/img/vid3.mp4`}
							muted
							loop
							autoPlay></video>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>
						<video
							src={`${process.env.PUBLIC_URL}/img/vid4.mp4`}
							muted
							loop
							autoPlay></video>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>
						<video
							src={`${process.env.PUBLIC_URL}/img/vid5.mp4`}
							muted
							loop
							autoPlay></video>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className='inner'>
						<video
							src={`${process.env.PUBLIC_URL}/img/vid6.mp4`}
							muted
							loop
							autoPlay></video>
					</div>
				</SwiperSlide>
			</Swiper>
		</figure>
	);
}

export default Visual;
