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

function App() {
    const [toilets, setToilets] = useState(initialToilets);
    const [smokings, setSmokings] = useState(initialSmokings);
    const navigate = useNavigate();

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

    return (
        <>
            <Routes>
                {/* 홈화면 */}
                <Route path='/' element={<Home />} />
                {/* 검색화면 */}
                <Route path='/search' element={<Search />} />
                <Route path='/info' element={<Info />} />
                {/* 정보화면 */}
                <Route path='/description' element={<Description />} />
                {/* 후기화면 */}
                <Route path='/review' element={<Review />} />
                <Route path='/newreview' element={<NewReview />} />
                <Route path='/editreview' element={<EditReview />} />
                {/* 내 장소 목록 화면 */}
                <Route path='/myplace' element={<MyPlace toilets={toilets} />} />
                <Route path='/myplacesmoking' element={<MyPlaceSmoking smokings={smokings} />} />
                <Route path='/selectmyplacetoilet' element={<SelectMyPlaceToilet />} />
                <Route path='/selectmyplacesmoking' element={<SelectMyPlaceSmoking />} />
                <Route path='/newmyplacetoilet' element={<NewMyPlaceToilet addToilet={addToilet} />} />
                <Route path='/newmyplacesmoking' element={<NewMyPlaceSmoking addSmoking={addSmoking} />} />
                <Route path='/editmyplacetoilet/:id' element={<EditMyPlaceToilet toilets={toilets} onUpdateToilet={updateToilet} />} />
                <Route path='/editmyplacesmoking/:id' element={<EditMyPlaceSmoking smokings={smokings} onUpdateSmoking={updateSmoking} />} />
                {/* 마이페이지 화면 */}
                {/* <Route path='/mypage' element={<MyPage />} /> */}
            </Routes>
        </>
    );
}

export default App;
