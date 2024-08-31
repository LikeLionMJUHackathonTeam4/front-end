import { useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";

const Map = forwardRef((props, ref) => {
  const mapContainer = useRef(null);
  const [location, setLocation] = useState({
    lat: 37.46849,
    lng: 127.0395,
  });

  useImperativeHandle(ref, () => ({
    updateLocation: () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (err) => {
            console.error("Error getting location: ", err);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    },
  }));

  useEffect(() => {
    if (mapContainer.current && window.kakao) {
      const mapOption = {
        center: new window.kakao.maps.LatLng(location.lat, location.lng), // 'kakao' 객체가 준비되었는지 확인
        level: 3,
      };

      const map = new window.kakao.maps.Map(mapContainer.current, mapOption);

      function displayMarker(locPosition, message) {
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: locPosition,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: message,
          removable: true,
        });

        infowindow.open(map, marker);
        map.setCenter(locPosition);
      }

      const locPosition = new window.kakao.maps.LatLng(location.lat, location.lng);
      const message = '<div style="padding:5px;">현 위치</div>';
      displayMarker(locPosition, message);
    }
  }, [location]);

  return (
    <div className="Home">
      <div className="map-container">
        <div
          ref={mapContainer}
          className="map"
          style={{ width: "100%", height: "100vh" }}
        ></div>
      </div>
    </div>
  );
});

export default Map;
