import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import MapSearch from '../components/MapSearch';
import TopButton from '../components/TopButton';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import ToiletMap from '../util/ToiletMap';

const Home = () => {
  const location = useLocation();

  return (
    <div className='Home'>
      <Map />
      <ToiletMap />
      <MapSearch />
      <TopButton />
      <Navbar currentPath={location.pathname} />
    </div>
  );
}

export default Home;