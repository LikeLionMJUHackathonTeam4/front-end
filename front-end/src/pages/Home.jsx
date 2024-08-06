import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Home.css';
import HomeMap from '../components/HomeMap';
import MapSearch from '../components/MapSearch';
import TopButton from '../components/TopButton';
import Navbar from '../components/Navbar';

const Home = () => {
    const location = useLocation();

    return (
        <div className='Home'>
            {<HomeMap />}
            <MapSearch />
            <TopButton />
            <Navbar currentPath={location.pathname} />
        </div>
    );
};

export default Home;
