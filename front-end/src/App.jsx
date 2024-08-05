import './App.css'
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Info from './pages/Info';
import Description from './pages/Description';
import Review from './pages/Review';
import NewReview from './pages/NewReview';
import EditReview from './pages/EditReview';
import MyPlace from './pages/MyPlace';
import MyPlaceSmoking from './pages/MyPlaceSmoking';
import SelectMyPlaceToilet from './pages/SelectMyPlaceToilet';
import SelectMyPlaceSmoking from './pages/SelectMyPlaceSmoking';
import NewMyPlaceToilet from './pages/NewMyPlaceToilet';
import NewMyPlaceSmoking from './pages/NewMyPlaceSmoking';
import EditMyPlaceToilet from './pages/EditMyPlaceToilet';
import EditMyPlaceSmoking from './pages/EditMyPlaceSmoking';
import initialToilets from './util/initialToilets';
import initialSmokings from './util/initialSmokings';
import MyPage from './pages/MyPage';

function App() {

    const addToilet = (newToilet) => {
        setToilets(prevToilets => [...prevToilets, newToilet]);
        navigate('/myplace');
    };

    const addSmoking = (newSmoking) => {
        setSmokings(prevSmokings => [...prevSmokings, newSmoking]);
        navigate('/myplacesmoking');
    };

    const updateToilet = (updatedToilet) => {
        setToilets(prevToilets =>
            prevToilets.map(toilet =>
                toilet.id === updatedToilet.id ? updatedToilet : toilet
            )
        );
    };

    const updateSmoking = (updatedSmoking) => {
        setSmokings(prevSmokings =>
            prevSmokings.map(smoking =>
                smoking.id === updatedSmoking.id ? updatedSmoking : smoking
            )
        );
    };

    const deleteToilet = (id) => {
        setToilets(prevToilets => prevToilets.filter(toilet => toilet.id !== id));
    };

    const deleteSmoking = (id) => {
        setSmokings(prevSmokings => prevSmokings.filter(smoking => smoking.id !== id));
    };

    return (
        <>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search' element={<Search />} />
                <Route path='/info' element={<Info />} />
                <Route path='/description' element={<Description />} />
                <Route path='/review' element={<Review />} />
                <Route path='/newreview' element={<NewReview />} />
                <Route path='/editreview' element={<EditReview />} />
                <Route path='/myplace' element={<MyPlace toilets={toilets} onDeleteToilet={deleteToilet} />} />
                <Route path='/myplacesmoking' element={<MyPlaceSmoking smokings={smokings} onDeleteSmoking={deleteSmoking} />} />
                <Route path='/selectmyplacetoilet' element={<SelectMyPlaceToilet />} />
                <Route path='/selectmyplacesmoking' element={<SelectMyPlaceSmoking />} />
                <Route path='/newmyplacetoilet' element={<NewMyPlaceToilet addToilet={addToilet} />} />
                <Route path='/newmyplacesmoking' element={<NewMyPlaceSmoking addSmoking={addSmoking} />} />
                <Route path='/editmyplacetoilet/:id' element={<EditMyPlaceToilet toilets={toilets} onUpdateToilet={updateToilet} />} />
                <Route path='/editmyplacesmoking/:id' element={<EditMyPlaceSmoking smokings={smokings} onUpdateSmoking={updateSmoking} />} />
                <Route path='/mypage' element={<MyPage />} />
            </Routes>
        </>
    );
}

export default App;
