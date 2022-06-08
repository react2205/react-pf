import Layout from '../common/Layout';
import { useEffect, useRef } from 'react';

function Location() {
	//윈도우 전역객체에 있는 kakao키값을 바로 변수로 비구조화 할당
	const { kakao } = window;
	const container = useRef(null);
	const option = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	//위치 인스턴스 생성
	const markerPosition = new kakao.maps.LatLng(
		33.450701,
		126.570667
	);

	//위치 인스턴스 값을 인수로 해서 마커 인스턴스 생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
	});
	//최종 마커 호출

	useEffect(() => {
		//지도 인스턴스 생성
		const map_instance = new kakao.maps.Map(
			container.current,
			option
		);
		//마커 출력
		marker.setMap(map_instance);
	}, []);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Location;
