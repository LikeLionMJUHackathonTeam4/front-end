import { useEffect } from "react"
import { Map, MapMarker } from 'react-kakao-maps-sdk'

const { kakao } = window;

const HomeMap = () => {
    return (
        <Map
            className="HomeMap"
            center={{ lat: 33.5563, lng: 126.79581 }}   // 지도의 중심 좌표
            style={{ width: '478px', height: '100vh' }} // 지도 크기
            level={3}                                   // 지도 확대 레벨
        >
            <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}> </MapMarker> {/* 마커 좌표 */}
        </Map>);
}

export default HomeMap;