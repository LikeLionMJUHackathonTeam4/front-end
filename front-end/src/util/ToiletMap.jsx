import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToiletMap = () => {
  const [toilets, setToilets] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Kakao 지도 API 스크립트를 비동기로 로드
    const loadKakaoMapScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=16209dfcec751a5037b7f2983dd7c925`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Kakao Map API script failed to load'));
        document.head.appendChild(script);
      });
    };

    loadKakaoMapScript()
      .then(() => {
        // API 스크립트가 로드된 후 Kakao 객체를 사용할 수 있음
        initializeMap();
      })
      .catch(err => {
        console.error('스크립트 로드 오류:', err);
      });
  }, []);

  const initializeMap = () => {
    if (window.kakao) {
      const { kakao } = window;
      const container = document.getElementById('map');
      const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 중심 좌표
        level: 5 // 초기 줌 레벨
      };
      const mapInstance = new kakao.maps.Map(container, options);
      setMap(mapInstance);

      const geocoder = new kakao.maps.services.Geocoder(); // Geocoder 객체 생성

      // 지도에 화장실 마커 추가
      toilets.forEach(toilet => {
        const coords = new kakao.maps.LatLng(toilet.wsg84y, toilet.wsg84x);
        const marker = new kakao.maps.Marker({
          map: mapInstance,
          position: coords
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${toilet.name}<br>${toilet.type}</div>`
        });

        kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(mapInstance, marker);
        });

        kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });
      });
    } else {
      console.error('kakao 객체가 정의되어 있지 않습니다.');
    }
  };

  useEffect(() => {
    axios.get('http://ec2-52-79-61-245.ap-northeast-2.compute.amazonaws.com:8080/api/toilets')
      .then(response => {
        if (response.data && response.data.code === 200) {
          setToilets(response.data.data); // 응답에서 화장실 데이터 가져오기
        } else {
          console.error('데이터를 가져오는 데 실패했습니다.');
        }
      })
      .catch(err => {
        console.error('API 호출 오류:', err);
      });
  }, []);

  return (
    <div>
      <h1>Public Toilets Map</h1>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default ToiletMap;