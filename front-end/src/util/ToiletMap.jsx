import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ToiletMap = ({ toilets }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      initializeMap();
    }
  }, [toilets]);

  const initializeMap = () => {
    const { kakao } = window;
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.5665, 126.9780),
      level: 5,
    };
    const mapInstance = new kakao.maps.Map(container, options);
    setMap(mapInstance);

    // Geocoder 객체를 생성하기 전에 kakao.maps.services가 정의되어 있는지 확인
    if (kakao.maps.services) {
      const geocoder = new kakao.maps.services.Geocoder();

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
      console.error("kakao.maps.services is not available.");
    }
  };

  useEffect(() => {
    const endpoint = import.meta.env.VITE_BE_ENDPOINT;
    axios.get(endpoint+'/api/toilets/all')
      .then(response => {
        if (response.data && response.data.code === 200) {
          setToilets(response.data.data);
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
