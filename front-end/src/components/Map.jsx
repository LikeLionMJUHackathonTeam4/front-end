import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import toiletPointIcon from '../image/toiletPoint.svg';
import myToiletIcon from "../image/myToilet.svg";
import smokePointIcon from '../image/smokingPoint.svg';

const Map = forwardRef((props, ref) => {
  const { toilets, smoke } = props;
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치 (서울)
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커 상태 관리
  const [placesService, setPlacesService] = useState(null);

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

    addMarkers(toilets, smoke) {
      // 기존 마커 제거
      markers.forEach(marker => marker.setMap(null));

      const geocoder = new window.kakao.maps.services.Geocoder();  // Geocoder 객체 생성

      // 화장실 마커 추가
      if (toilets.length > 0) {
        const newMarkers = toilets.map(toilet => {
          const markerPosition = new window.kakao.maps.LatLng(toilet.wsg84y, toilet.wsg84x);
          
          // 원하는 마커 이미지 설정
          const imageSrc = toilet.isMyPlace ? myToiletIcon : toiletPointIcon;
          const imageSize = new window.kakao.maps.Size(35, 35);
          const imageOption = { offset: new window.kakao.maps.Point(17.5, 17.5) };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
            title: toilet.name, // 마커에 화장실 이름 추가
            image: markerImage // 마커 이미지 추가
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            geocoder.coord2Address(toilet.wsg84x, toilet.wsg84y, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;
                
                // 마커 클릭 시 주소 정보를 함께 전달
                const toiletWithAddress = { ...toilet, address };
                props.onMarkerClick(toiletWithAddress);
              } else {
                console.error("주소 변환 실패");
              }
            });
            if (props.onMarkerClick) {
              props.onMarkerClick(toilet); // 마커 클릭 시 화장실 정보를 전달
            }
          });

          return marker;
        });

        setMarkers(newMarkers); // 새로운 마커 상태 업데이트
      } else {
        setMarkers([]); // 마커가 비어있을 때 상태 초기화
      }

      if (smoke.length > 0) {
        const geocoder = new window.kakao.maps.services.Geocoder();  // Geocoder 객체 생성

        const newMarkers = smoke.map(smoking => {
          const markerPosition = new window.kakao.maps.LatLng(smoking.wsg84y, smoking.wsg84x);
          
          // 원하는 마커 이미지 설정
          const imageSrc = smoking.isMyPlace ? myToiletIcon : smokePointIcon;
          const imageSize = new window.kakao.maps.Size(35, 35);
          const imageOption = { offset: new window.kakao.maps.Point(17.5, 17.5) };
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
            title: smoking.name, // 마커에 화장실 이름 추가
            image: markerImage // 마커 이미지 추가
          });

          window.kakao.maps.event.addListener(marker, 'click', () => {
            geocoder.coord2Address(smoking.wsg84x, smoking.wsg84y, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address.address_name;
                
                // 마커 클릭 시 주소 정보를 함께 전달
                const smokeWithAddress = { ...smoking, address };
                props.onMarkerClick(smokeWithAddress);
              } else {
                console.error("주소 변환 실패");
              }
            });
            if (props.onMarkerClick) {
              props.onMarkerClick(smoking); // 마커 클릭 시 화장실 정보를 전달
            }
          });

          return marker;
        });

        setMarkers(newMarkers); // 새로운 마커 상태 업데이트
      } else {
        setMarkers([]); // 마커가 비어있을 때 상태 초기화
      }
      }
    },
    searchPlace(keyword) {
      // 장소 검색
      if (placesService) {
        placesService.keywordSearch(keyword, (data, status, _pagination) => {
          if (status === kakao.maps.services.Status.OK) {
            // 검색 결과로 지도 이동 및 마커 표시
            const bounds = new kakao.maps.LatLngBounds();

            // 기존 마커 제거
            markers.forEach(marker => marker.setMap(null));
            const newMarkers = data.map(place => {
              const placePosition = new kakao.maps.LatLng(place.y, place.x);
              const marker = new kakao.maps.Marker({
                position: placePosition,
                map: map,
                title: place.place_name, // 마커에 장소 이름 추가
              });
              bounds.extend(placePosition); // 범위 확장
              return marker;
            });

            setMarkers(newMarkers); // 새로운 마커 상태 업데이트
            map.setBounds(bounds); // 검색 결과에 맞게 지도 범위 설정
          } else {
            console.error('장소를 찾을 수 없습니다.');
          }
        });
      } else {
        console.error('Place 서비스가 아직 로드되지 않았습니다.');
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

      // 카카오맵 Place 서비스 객체 생성
      const places = new window.kakao.maps.services.Places();
      setPlacesService(places);

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
