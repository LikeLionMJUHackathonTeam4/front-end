import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";

const Map = forwardRef((props, ref) => {
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치 (서울)
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커 상태 관리

  useImperativeHandle(ref, () => ({
    updateLocation() {
      // 사용자의 현재 위치를 다시 검색
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(newLocation);
            if (map) {
              const moveLatLon = new window.kakao.maps.LatLng(newLocation.lat, newLocation.lng);
              map.setCenter(moveLatLon);  // 지도 중심을 새로운 위치로 이동
            }
          },
          (err) => {
            console.error("위치를 가져오는 중 오류 발생: ", err);
          }
        );
      } else {
        console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      }
    },
    addMarkers(toilets) {
        // 기존 마커 제거
        markers.forEach(marker => marker.setMap(null));
        const newMarkers = toilets.map(toilet => {
          const markerPosition = new window.kakao.maps.LatLng(toilet.wsg84y, toilet.wsg84x);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
            title: toilet.name // 마커에 화장실 이름 추가
          });
          return marker;
        });
        setMarkers(newMarkers); // 새로운 마커 상태 업데이트
      }
  }));

  useEffect(() => {
    if (window.kakao && window.kakao.maps && location) {
      const container = document.getElementById("mapContainer");
      const options = {
        center: new window.kakao.maps.LatLng(location.lat, location.lng),
        level: 3,
      };

      const mapInstance = new window.kakao.maps.Map(container, options);
      setMap(mapInstance);

      // 현재 위치에 마커 표시
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(location.lat, location.lng),
        map: mapInstance,
      });
    }
  }, [location]);

  return (
    <div id="mapContainer" style={{ width: "100%", height: "100vh" }}></div>
  );
});

export default Map;
