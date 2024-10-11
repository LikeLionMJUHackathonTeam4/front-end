import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";
import toiletPointIcon from '../image/toiletPoint.svg';
import myToiletIcon from "../image/myToilet.svg";

const Map = forwardRef((props, ref) => {
  const { toilets, isTracking, stopTracking } = props;
  const [location, setLocation] = useState({ lat: 37.5665, lng: 126.9780 }); // 기본 위치 (서울)
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커 상태 관리
  const [placesService, setPlacesService] = useState(null);
  const currentLocationMarker = useRef(null); // 현위치 마커를 useRef로 관리
  const [watchId, setWatchId] = useState(null); // 위치 추적 ID 상태

  useImperativeHandle(ref, () => ({
    updateLocation() {
      // 사용자의 현재 위치를 다시 검색
      if (navigator.geolocation) {
        // 위치 변화를 지속적으로 추적
        const newWatchId = navigator.geolocation.watchPosition(
        // navigator.geolocation.getCurrentPosition(
          (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setLocation(newLocation);
            
            if (map) {
              const moveLatLon = new window.kakao.maps.LatLng(newLocation.lat, newLocation.lng);
              map.setCenter(moveLatLon);  // 지도 중심을 새로운 위치로 이동
              // 현위치 마커가 이미 있는 경우 위치 업데이트, 없는 경우 새로 생성
              if (currentLocationMarker.current) {
                // currentLocationMarker.setPosition(moveLatLon); // 기존 마커 위치 업데이트
                console.log("b: 마커 위치 업데이트");
                currentLocationMarker.current.setPosition(moveLatLon);
              } else {
                // const marker = new window.kakao.maps.Marker({
                //   position: moveLatLon,
                //   map: map,
                //   title: '현재 위치'
                // });
                // setCurrentLocationMarker(marker); // 새 마커 생성 후 상태 업데이트
                console.log("a: 마커 생성");
                currentLocationMarker.current = new window.kakao.maps.Marker({
                  position: moveLatLon,
                  map: map,
                  title: '현재 위치'
                });
              }
              // const marker = new window.kakao.maps.Marker({
              //   position: moveLatLon,
              //   map: map,
              //   title: '현재 위치'
              //   // ,
              //   // image: new window.kakao.maps.MarkerImage(
              //   //   "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",
              //   //   new window.kakao.maps.Size(24, 35)
              //   // ) // 마커 이미지 추가 (스타일 지정 가능)
              // });
            }
          },
          (err) => {
            console.error("위치를 가져오는 중 오류 발생: ", err);
          },
          {
            enableHighAccuracy: true, // 높은 정확도로 위치 추적
            timeout: 10000, // 5초 안에 위치 정보를 가져오지 못하면 실패
            maximumAge: 0 // 항상 최신 정보를 가져오도록 설정
          }
        );
        // watchId를 이용해 나중에 위치 추적을 중지할 수 있음
        setWatchId(newWatchId);
      } else {
        console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
      }
    },

    // 마커 추가 함수
    addMarkers(toilets) {
      // 외부에서 호출할 수 있도록 addMarkers를 포함
      addMarkers(toilets);
    },

    stopTracking() {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId); // 추적 중지
        setWatchId(null); // watchId 초기화
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
  // 마커 추가 함수
  const addMarkers = (toilets) => {

    // toilets가 배열인지 확인
    if (!Array.isArray(toilets) || toilets.length === 0) {
      console.error('Invalid toilets data or empty array.');
      return;
    }
    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    if (toilets.length > 0) {
      const geocoder = new window.kakao.maps.services.Geocoder();  // Geocoder 객체 생성

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
  };

  // 사용자가 지도를 드래그하거나 터치할 때 추적을 중지
  useEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'dragstart', () => {
        if (isTracking) {
          stopTracking(); // 추적 중지
        }
      });
      window.kakao.maps.event.addListener(map, 'touchstart', () => {
        if (isTracking) {
          stopTracking(); // 추적 중지
        }
      });
    }
  }, [map, isTracking, stopTracking]);

  useEffect(() => {
    if (map && Array.isArray(toilets) && toilets.length > 0) {
      addMarkers(toilets); // toilets가 유효할 때만 마커 추가
    }
  }, [toilets, map]);

  // currentLocationMarker가 설정된 후 다시 위치를 업데이트
  // useEffect(() => {
  //   if (currentLocationMarker) {
  //     currentLocationMarker.setPosition(new window.kakao.maps.LatLng(location.lat, location.lng));
  //   }
  // }, [location, currentLocationMarker]);

  useEffect(() => {
    if (window.kakao && window.kakao.maps && location) {
      const container = document.getElementById("mapContainer");
      
      // 이미 지도 인스턴스가 생성되었는지 확인
      if (!map) {
        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng),
          level: 3,
        };
        const mapInstance = new window.kakao.maps.Map(container, options);
        setMap(mapInstance);
  
        // 카카오맵 Place 서비스 객체 생성
        const places = new window.kakao.maps.services.Places();
        setPlacesService(places);
  
        // // 현재 위치에 마커 표시
        // new window.kakao.maps.Marker({
        //   position: new window.kakao.maps.LatLng(location.lat, location.lng),
        //   map: mapInstance,
        // });
      } else {
        // 지도 인스턴스가 이미 있을 경우 위치만 업데이트
        const moveLatLon = new window.kakao.maps.LatLng(location.lat, location.lng);
        map.setCenter(moveLatLon);
        addMarkers(toilets); // 위치가 업데이트될 때 마커 추가
      }
    }
  }, [location, map, toilets]);

  return (
    <div id="mapContainer" style={{ width: "100%", height: "100vh" }}></div>
  );
});

export default Map;
