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
    if (mapContainer.current) {
      let mapOption = {
        center: new kakao.maps.LatLng(location.lat, location.lng),
        level: 3,
      };

      let map = new kakao.maps.Map(mapContainer.current, mapOption);

      function displayMarker(locPosition, message) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: locPosition,
        });

        let iwContent = message;
        let iwRemoveable = true;

        let infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        infowindow.open(map, marker);
        map.setCenter(locPosition);
      }

      let locPosition = new kakao.maps.LatLng(location.lat, location.lng);
      let message = '<div style="padding:5px;">현 위치</div>';
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

