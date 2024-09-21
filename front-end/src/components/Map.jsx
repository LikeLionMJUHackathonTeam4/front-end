import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";

const Map = forwardRef((props, ref) => {
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치 (서울)
  const [map, setMap] = useState(null);

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
